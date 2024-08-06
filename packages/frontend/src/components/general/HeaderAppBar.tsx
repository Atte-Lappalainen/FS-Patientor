import AppBar from '@mui/material/AppBar'

import Toolbar from '@mui/material/Toolbar'

import Container from '@mui/material/Container'

// import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

enum pages {
  Home = 'Home',
  Patients = 'Patients',
  Blog = 'Blog'
}

export const HeaderAppBar = () => {
  const navigate = useNavigate()

  const handleNavigation = (page: 'Home' | 'Patients' | 'Blog') => {
    switch (page) {
      case pages.Home:
        navigate(`/`)
        break
      case pages.Patients:
        navigate(`/patients`)
        break
      case pages.Blog:
        navigate(`/Blog`)
        break
      default:
        console.log('errror in headerappbar handlenavigation')
        break
    }
  }

  // <BloodtypeIcon style={{ marginBottom: "0.5em" }}/>

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {(Object.keys(pages) as Array<keyof typeof pages>).map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block', border: 'white' }}
              onClick={() => handleNavigation(page)}
            >
              {page}
            </Button>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
