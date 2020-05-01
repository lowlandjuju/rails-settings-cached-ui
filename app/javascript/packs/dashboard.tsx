// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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

import * as types from 'packs/types'

interface Props {
  logged_in_user: object
  settings: types.Settings
  schema: types.Schema
  application: types.Application
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#444',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Dashboard: React.FC<Props> = ({
  logged_in_user,
  settings,
  schema,
  application,
}) => {
  const classes = useStyles()
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
          <Paper elevation={3}>
            <Grid container direction="column">
              <Grid item xs={12} style={{ width: '100%' }}>
                <AppBar position="static" className={classes.root}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
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
              <Grid item xs={12} style={{ width: '100%', padding: 20 }}>
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
