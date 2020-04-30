// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import * as React from 'react'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

interface Props {
  logged_in_user: object
  settings: object
}

const Dashboard: React.FC<Props> = ({ logged_in_user, settings }) => {
  return (
    <div>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Typography variant="h4">Settings UI</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {logged_in_user && (
            <div>
              Hello {logged_in_user['first_name']} ({logged_in_user['email']})!
            </div>
          )}
          {Object.entries(settings).map((setting) => (
            <div>
              <h3>Setting group: {setting[0]}</h3>
              {Object.entries(setting[1]).map((value) => (
                <p>
                  {value[0]} => {value[1]}
                </p>
              ))}
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('sui-dashboard')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(<Dashboard {...data} />, node)
})
