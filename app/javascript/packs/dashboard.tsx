// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import * as React from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import SettingsSection from 'packs/components/SettingsSection'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'

import styles from 'packs/styles'
import * as types from 'packs/types'
import http from 'packs/http'
import Alerter from 'packs/components/Alerter'

interface Props {
  logged_in_user: object
  settings: types.Settings
  schema: types.Schema
  application: types.Application
}

const Dashboard: React.FC<Props> = ({
  logged_in_user,
  settings,
  schema,
  application,
}) => {
  const classes = styles.dashboard()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const [saving, setSaving] = React.useState(false)
  const [alert, setAlert] = React.useState({
    alertedAt: null,
    severity: null,
    message: null,
  })

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const resetAll = () => {
    setSaving(true)
    let newAlert = { alertedAt: Date.now(), severity: 'success', message: null }
    http
      .post('/settings_ui/settings/default', {})
      .then(() => {
        newAlert = { ...newAlert, message: 'All settings returned to default' }
        setTimeout(() => window.location.reload(), 1500)
      })
      .catch((err) => {
        newAlert = { ...newAlert, severity: 'error', message: err.toString() }
      })
      .then(() => {
        setAlert(newAlert)
        handleClose()
        setSaving(false)
      })
  }

  return (
    <Container maxWidth="md" style={{ paddingTop: 30 }}>
      <Grid container spacing={2} direction="column" alignContent="center">
        <Grid item xs={12} style={{ width: '100%' }}>
          <Paper elevation={3} style={{ mixBlendMode: 'screen', padding: 10 }}>
            <Typography
              variant="h4"
              style={{ fontWeight: 900, textAlign: 'center' }}
            >
              {application.name} Settings UI
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ width: '100%' }}>
          <Paper elevation={3} className={classes.root}>
            <Grid container direction="column">
              <Grid item xs={12} style={{ width: '100%' }}>
                <AppBar position="static" className={classes.appBar}>
                  <Toolbar>
                    <div>
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.menuButton}
                        onClick={handleMenu}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={resetAll}
                          disabled={saving}
                          className={classes.menuItem}
                        >
                          Reset all settings to defaults
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={handleClose}
                          className={classes.menuItemClose}
                        >
                          Close menu
                        </MenuItem>
                      </Menu>
                    </div>
                    <Typography variant="body1" className={classes.title}>
                      {logged_in_user &&
                        `${logged_in_user['first_name']} (${logged_in_user['email']})`}
                    </Typography>
                    <Button color="inherit" href="/">
                      Back to {application.name}
                    </Button>
                  </Toolbar>
                </AppBar>
              </Grid>
              {alert.alertedAt && <Alerter {...alert} />}
              <Grid item xs={12} style={{ width: '100%', padding: 20 }}>
                <Grid container spacing={2} direction="column">
                  {Object.entries(settings).map((entry: any[]) => (
                    // @ts-ignore
                    <SettingsSection
                      name={entry[0]}
                      settingsSection={entry[1]}
                      schemaSection={schema[entry[0]]}
                      key={entry[0]}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('sui-dashboard')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(<Dashboard {...data} />, node)
})
