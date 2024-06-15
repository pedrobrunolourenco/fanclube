import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material"

interface IFerramentasDeDetalheProps{
   textoBotaoNovo?: string;

   mostrarBotaoVoltar?: boolean;
   mostrarBotaoApagar?: boolean;
   mostrarBotaoSalvar?: boolean;

   mostrarBotaoVoltarCarregando?: boolean;
   mostrarBotaoApagarCarregando?: boolean;
   mostrarBotaoSalvarCarregando?: boolean;
 

   aoClicarEmVoltar?: () => void;
   aoClicarEmApagar?: () => void;
   aoClicarEmSalvar?: () => void;
}




export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,

    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,

    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
 
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));    

    return(
        <Box
            height={theme.spacing(6)} 
            marginX={1} 
            paddingX={2} 
            display="flex" 
            gap={1} 
            alignItems="center"  
            component={Paper}        
        >
                 

                {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) &&
                    (
                        <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={aoClicarEmSalvar}
                        endIcon={<Icon>save</Icon>}
                     >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Salvar
                        </Typography>
                     </Button>
                    )
                }


              
                {mostrarBotaoSalvarCarregando && (
                    <Skeleton width={110} height={60} />
                )}



               {(mostrarBotaoApagar &&  !mostrarBotaoApagarCarregando) &&
                    (
                        <Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={aoClicarEmApagar}
                        startIcon={<Icon>delete</Icon>}
                     >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Apagar
                        </Typography>
                     </Button>
                   )
                }


              {mostrarBotaoApagarCarregando && (
                 <Skeleton width={110} height={60} />
              )}                


               { 
                 (
                    mostrarBotaoVoltar &&
                    (mostrarBotaoApagar || mostrarBotaoSalvar) 
                 ) &&
               (
                   <Divider variant="middle" orientation="vertical" />
               )}


              {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) &&
                    (
                        <Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={aoClicarEmVoltar}
                        startIcon={<Icon>arrow_back</Icon>}
                     >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Voltar
                        </Typography>
                  </Button>
                   )
                }

            {mostrarBotaoVoltarCarregando && (
               <Skeleton width={110} height={60} />
            )}
 

        </Box>
    )

}