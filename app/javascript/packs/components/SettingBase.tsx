import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import * as types from 'packs/types'

import http from 'packs/http'
import Alerter from 'packs/components/Alerter'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  columnOption: {
    flexBasis: '25%',
  },
  columnText: {
    flexBasis: '75%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

interface Props {
  setting: types.Setting
}

const SettingBase = ({ setting }: Props) => {
  const classes = useStyles()

  const [newValue, setNewValue] = React.useState(setting.value)
  const [saving, setSaving] = React.useState(false)
  const [alert, setAlert] = React.useState({
    alertedAt: null,
    severity: null,
    message: null,
  })

  const handleChange = (event) => {
    setNewValue(event.target.checked)
  }

  const handleSave = () => {
    http
      .put('/settings_ui/settings', {
        setting: {
          section: setting.section,
          path: setting.path,
          value: newValue,
        },
      })
      .then(() => {
        setAlert({
          alertedAt: Date.now(),
          severity: 'success',
          message: `[${setting.section}] ${
            setting.path
          } set to "${newValue.toString()}"`,
        })
        setSaving(true)
        setTimeout(() => window.location.reload(), 1000)
      })
      .catch((err) =>
        setAlert({
          alertedAt: Date.now(),
          severity: 'error',
          message: `[${setting.section}] ${err} `,
        })
      )
  }

  const getComponent = () => {
    switch (setting.type) {
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={newValue}
                onChange={handleChange}
                name={setting.path}
                color="primary"
                disabled={!setting.available}
              />
            }
            label={newValue.toString()}
          />
        )
      default:
    }
  }

  return (
    <div className={classes.root}>
      {alert.alertedAt && <Alerter {...alert} />}
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.columnOption}>
            <Typography className={classes.heading}>{setting.label}</Typography>
          </div>
          <div className={classes.columnText}>
            <Typography className={classes.secondaryHeading}>
              Current value: {setting.value.toString()}
            </Typography>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.columnOption}>{getComponent()}</div>
          <div className={clsx(classes.columnText, classes.helper)}>
            <Typography variant="caption">
              {setting.description ||
                `Trump Ipsum:
              <br />
              Some people have an ability to write placeholder text... It's an
              art you're basically born with. You either have it or you don't.
              All of the words in Lorem Ipsum have flirted with me - consciously
              or unconsciously. That's to be expected.`}
              <br />
              {setting.link && (
                <a href={setting.link} className={classes.link}>
                  Learn more
                </a>
              )}
            </Typography>
          </div>
        </ExpansionPanelDetails>

        <Divider />
        {newValue !== setting.value && !saving && (
          <ExpansionPanelActions>
            <Button size="small" onClick={() => setNewValue(setting.value)}>
              Cancel
            </Button>
            <Button size="small" color="primary" onClick={handleSave}>
              Save
            </Button>
          </ExpansionPanelActions>
        )}
      </ExpansionPanel>
    </div>
  )
}

export default SettingBase
