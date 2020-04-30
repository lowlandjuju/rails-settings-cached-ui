import * as React from 'react'
import Typography from '@material-ui/core/Typography'

type Props = {
  label: string
  value: boolean
}
type State = {}

const SettingBooleanFunc = (props: Props) => {
  return (
    <div>
      <Typography variant="body1">
        {props.label} - {props.value.toString()}
      </Typography>
    </div>
  )
}

export default SettingBooleanFunc
