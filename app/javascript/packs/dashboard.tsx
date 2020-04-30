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

interface Props {
  logged_in_user: object
  settings: object
  schema: object
}

const Dashboard: React.FC<Props> = ({ logged_in_user, settings, schema }) => {
  return (
    <Container maxWidth="sm" style={{ paddingTop: 30 }}>
      <Grid container spacing={1} direction="column" alignContent="center">
        <Grid item xs={12} style={{ width: '100%' }}>
          <Paper elevation={3} style={{ mixBlendMode: 'screen', padding: 10 }}>
            <Typography
              variant="h4"
              style={{ fontWeight: 900, textAlign: 'center' }}
            >
              Settings UI
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ width: '100%' }}>
          <Paper elevation={3} style={{ padding: 20 }}>
            {logged_in_user && (
              <div>
                Hello {logged_in_user['first_name']} ({logged_in_user['email']}
                )!
              </div>
            )}
            {Object.entries(settings).map((entry) => (
              // @ts-ignore
              <SettingsSection
                name={entry[0]}
                section={entry[1]}
                schema={schema[entry[0]]}
                key={entry[0]}
              />
            ))}
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
