import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import SettingBase from 'packs/components/SettingBase'
import * as types from 'packs/types'

interface Props {
  name: string
  settingsSection: types.SettingsSection
  schemaSection: types.SchemaSection
  key: string
}
const SettingsSection = ({ name, settingsSection, schemaSection }: Props) => {
  return (
    <Grid container spacing={0} direction="column">
      <Grid item xs={12}>
        <Typography gutterBottom variant="h5">
          {schemaSection.section_label}
        </Typography>
      </Grid>
      {Object.entries(settingsSection).map((settingItem) => {
        const setting = {
          ...schemaSection[settingItem[0]],
          value: settingItem[1],
          section: name,
          path: settingItem[0],
        }
        switch (setting.type) {
          case 'boolean':
            return (
              <Grid item xs={12} key={setting.path}>
                <SettingBase setting={setting} />
              </Grid>
            )
          default:
        }
      })}
    </Grid>
  )
}

export default SettingsSection
