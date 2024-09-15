import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

import { Enviroment } from "../../environment";

interface IFerramentasDaListagemProps{
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
    placeHolder?: string;
 
};

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = "" ,
    mostrarInputBusca,
    aoMudarTextoDeBusca,
    aoClicarEmNovo,
    textoBotaoNovo = "Novo",
    mostrarBotaoNovo = true,
    placeHolder = Enviroment.INPUT_DE_BUSCA
}) => {
    const theme = useTheme()
    return(
       <Box 
           height={theme.spacing(5)} 
           marginX={1} 
           paddingX={2} 
           display="flex" 
           padding={2}
           gap={1} 
           alignItems="center"  
           component={Paper}
       >

        { mostrarInputBusca && (
            <TextField 
               placeholder={placeHolder}
               value={textoDaBusca}
               onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
               size="small"
            />
        )}


          <Box flex={1} display="flex" justifyContent="end">
            { mostrarBotaoNovo && (
                <Button
                   variant="contained"
                   color="primary"
                   disableElevation
                   onClick={aoClicarEmNovo}
                   endIcon={<Icon>add</Icon>}
                >
                   {textoBotaoNovo}
                </Button>
            )}
          </Box>
       </Box>
    );
}