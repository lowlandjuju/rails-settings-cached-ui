import { makeStyles } from '@material-ui/core/styles'

const dashboard = makeStyles((theme) => ({
  root: {
    background: '#ffffff',
    position: 'relative',
  },
  appBar: {
    background: '#444444',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default {
  dashboard,
}
