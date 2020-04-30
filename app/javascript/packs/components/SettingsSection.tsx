import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SettingBooleanFunc from 'packs/components/SettingBoolean'

interface sectionProps {
  name: string
  section: object
  schema: object
}

function SettingsSection(props: sectionProps) {
  return Object.entries(props.section).map((entry: object) => {
    const entrySchema = props.schema[entry[0]]
    switch (entrySchema.type) {
      case 'boolean':
        return (
          <Grid container spacing={0} direction="column">
            <Grid item xs={12}>
              <Typography variant="h5">{props.name.toUpperCase()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <SettingBooleanFunc
                label={entrySchema.label}
                value={entry[1]}
                key={entry[0]}
              />
            </Grid>
          </Grid>
        )
      default:
    }
  })
}

export default SettingsSection
