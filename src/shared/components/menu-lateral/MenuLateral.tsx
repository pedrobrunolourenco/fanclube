import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../../contexts";

export const MenuLateral: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const {isDrowerOpen, toggleDrowerOpen} = useDrawerContext();

    return (
        <>
            <Drawer open={isDrowerOpen} variant={ smDown ? 'temporary' : 'permanent' } onClose={toggleDrowerOpen}>

                <Box width={theme.spacing(28)} height="100%" display="flex"  flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar 
                           sx={ {height: theme.spacing(12), width: theme.spacing(12) } }
                           src="/img/001-foto.png" />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                       <List component="nav">
                          <ListItemButton>
                              <ListItemIcon>
                                 <Icon>
                                    <Icon>home</Icon>
                                 </Icon>
                              </ListItemIcon>
                              <ListItemText primary="Página Inicial" />
                          </ListItemButton>

                       </List>

                    </Box>

                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={ smDown ? 0 : theme.spacing(28)}>
               { children }
            </Box>
        </>

    );

}