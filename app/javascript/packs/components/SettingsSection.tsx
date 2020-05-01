import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SettingBooleanFunc from 'packs/components/SettingBoolean'
import * as types from 'packs/types'

interface Props {
  name: string
  settingsSection: types.SettingsSection
  schemaSection: types.SchemaSection
  key: string
}
const SettingsSection = ({ name, settingsSection, schemaSection }: Props) => {
  return Object.entries(settingsSection).map((settingItem) => {
    const settingType = schemaSection[settingItem[0]].type
    switch (settingType) {
      case 'boolean':
        return (
          <Grid container spacing={0} direction="column" key={name}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {schemaSection.section_label}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SettingBooleanFunc
                label={schemaSection[settingItem[0]].label}
                value={settingItem[1]}
                key={settingItem[0]}
              />
            </Grid>
          </Grid>
        )
      default:
    }
  })
}

export default SettingsSection
