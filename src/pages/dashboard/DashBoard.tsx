import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FerramentasDaListagem } from "../../shared/components";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { NotaveisService } from "../../shared/services/api/notaveis/NotaveisService";
import { AdmiradoresService } from "../../shared/services/api/admiradores/AdmiradoresService";

export const DashBoard: React.FC = () => {

    const [isLoadingNotaveis, setIsLoadingNotaveis] = useState(true);
    const [isLoadingAdmiradores, setIsLoadinAdmiradores] = useState(true);
    const [totalCountNotaveis, setTotalCountNotaveis] = useState(0);
    const [totalCountAdmiradores, setTotalCountAdmiradores] = useState(0);
  
    useEffect(() => {
      setIsLoadingNotaveis(true);
      setIsLoadinAdmiradores(true);
  
      NotaveisService.getAll(1)
        .then((result) => {
          setIsLoadingNotaveis(false);
  
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setTotalCountNotaveis(result.totalCount);
          }
        });
      AdmiradoresService.getAll(1)
        .then((result) => {
            setIsLoadinAdmiradores(false);
  
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setTotalCountAdmiradores(result.totalCount);
          }
        });
    }, []);
  
  









    return(
        <LayOutBaseDePagina 
            titulo="DASHBOARD" 
            barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false}  />}
        >
            <Box width='100%' display='flex'>
                <Grid container margin={2}>
                    <Grid item container spacing={2}>

                    <Grid item xs={12} sm={12} md={6}  lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                     <Typography variant="h5" align="center">
                                        Total de Admiradores
                                    </Typography>

                                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                        {!isLoadingAdmiradores && (
                                            <Typography variant='h1'>
                                                {totalCountAdmiradores}
                                            </Typography>
                                            )}
                                            {isLoadingAdmiradores && (
                                            <Typography variant='h6'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>



                        <Grid item xs={12} sm={12} md={6}  lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Notáveis
                                    </Typography>

                                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                         {!isLoadingNotaveis && (
                                            <Typography variant='h1'>
                                                {totalCountNotaveis}
                                            </Typography>
                                            )}
                                            {isLoadingNotaveis && (
                                            <Typography variant='h6'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>




                    </Grid>
                </Grid>
            </Box>

        </LayOutBaseDePagina>
    );
}


