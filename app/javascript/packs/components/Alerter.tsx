import React from 'react'
import Alert, { Color } from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import { Collapse } from '@material-ui/core'

interface AlertProps {
  alertedAt: any
  severity: Color
  message: string
}

const Alerter = ({ alertedAt, severity, message }: AlertProps) => {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    show()
  }, [alertedAt])

  const show = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 5000)
  }

  return (
    <Collapse in={visible} style={{ marginBottom: visible ? 30 : 0 }}>
      <Alert severity={severity} onClose={() => setVisible(false)}>
        <AlertTitle>{severity}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  )
}

export default Alerter
