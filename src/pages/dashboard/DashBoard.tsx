import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FerramentasDaListagem } from "../../shared/components";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { useEffect, useState } from "react";
import { AdmiradoresService } from "../../shared/services/api/admiradores/AdmiradoresService";
import { Pie, Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, Title, PointElement);


export const DashBoard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [countUf, setTotalUf] = useState<number[]>([]);
    const [labelUf, setLabelUf] = useState<string[]>([]);
    const [countIdade, setTotalIdade] = useState<number[]>([]);
    const [labelIdade, setLabelIdade] = useState<string[]>([]);

    const fetchData = async () => {
        setIsLoading(true);
    
        try {
            const [ufResult, idadeResult] = await Promise.all([
                AdmiradoresService.getContagemUF(),
                AdmiradoresService.getContagemIdade()
            ]);
    
            if (ufResult instanceof Error || idadeResult instanceof Error) {
                console.log("erro ao buscar dados do grafico")
                return;
            }
    
            if (ufResult.data && Array.isArray(ufResult.data)) {
                setTotalUf(ufResult.data.map(item => item.count));
                setLabelUf(ufResult.data.map(item => item.uf));
            } else {
                console.error("A resposta da UF não contém um array válido:", ufResult);
            }
    
            if (idadeResult.data && Array.isArray(idadeResult.data)) {
                setTotalIdade(idadeResult.data.map(item => item.count));
                setLabelIdade(idadeResult.data.map(item => item.idade.toString()));
            } else {
                console.error("A resposta da idade não contém um array válido:", idadeResult);
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const dataUf = {
        labels: labelUf,
        datasets: [
            {
                label: 'Distribuição Por UF',
                data: countUf,
                backgroundColor: [
                    'rgba(255, 99, 71, 0.5)',   // Tomato
                    'rgba(0, 255, 255, 0.5)',   // Aqua
                    'rgba(255, 105, 180, 0.5)',  // Hot Pink
                    'rgba(255, 165, 0, 0.5)',    // Orange
                    'rgba(144, 238, 144, 0.5)',  // Light Green
                    'rgba(75, 0, 130, 0.5)'      // Indigo
                ],
                borderColor: [
                    'rgba(255, 99, 71, 1)', 
                    'rgba(0, 255, 255, 1)', 
                    'rgba(255, 105, 180, 1)', 
                    'rgba(255, 165, 0, 1)', 
                    'rgba(144, 238, 144, 1)', 
                    'rgba(75, 0, 130, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const dataIdade = {
        labels: labelIdade,
        datasets: [
            {
                label: 'Distribuição Por Idade',
                data: countIdade,
                backgroundColor: [
                    'rgba(255, 99, 71, 0.5)',   // Tomato
                    'rgba(0, 255, 255, 0.5)',   // Aqua
                    'rgba(255, 105, 180, 0.5)',  // Hot Pink
                    'rgba(255, 165, 0, 0.5)',    // Orange
                    'rgba(144, 238, 144, 0.5)',  // Light Green
                    'rgba(75, 0, 130, 0.5)'      // Indigo
                ],
                borderColor: [
                    'rgba(255, 99, 71, 1)', 
                    'rgba(0, 255, 255, 1)', 
                    'rgba(255, 105, 180, 1)', 
                    'rgba(255, 165, 0, 1)', 
                    'rgba(144, 238, 144, 1)', 
                    'rgba(75, 0, 130, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsPizza = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    const combinedDataUf = {
        labels: labelUf,
        datasets: [
            {
                type: 'bar' as const,
                label: 'Bar Dataset',
                data: countUf,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                type: 'line' as const,
                label: 'Line Dataset',
                data: countUf,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
        ],
    };

    const combinedDataIdade = {
        labels: labelIdade,
        datasets: [
            {
                type: 'bar' as const,
                label: 'Bar Dataset',
                data: countIdade,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                type: 'line' as const,
                label: 'Line Dataset',
                data: countIdade,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
        ],
    };


    const optionsBar = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          tooltip: {
            callbacks: {
                label: function (tooltipItem: any) {
                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
            },
          },
        },
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
          },
        },
    };

    return (
        <LayOutBaseDePagina 
            titulo="DASHBOARD" 
            barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
        >
            <Box width='100%' display='flex'>
                <Grid container margin={2} spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align="center">
                                    Admiradores Distribuídos por UF (TOP 6)
                                </Typography>
                                <Box padding={2} display="flex" justifyContent="center" alignItems="center"  style={{ height: 250 }}>
                                    {isLoading ? <Typography>Carregando...</Typography> : <Pie data={dataUf} options={optionsPizza} />}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" align="center">
                                    Admiradores Distribuídos por Idade (TOP 6)
                                </Typography>
                                <Box padding={2} display="flex" justifyContent="center" alignItems="center"  style={{ height: 250 }}>
                                    {isLoading ? <Typography>Carregando...</Typography> : <Pie data={dataIdade} options={optionsPizza} />}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Card>
                            <CardContent>
                                <Box padding={2} display="flex" justifyContent="center" alignItems="center"  style={{ height: 250 }}>
                                   <Chart type="bar" data={combinedDataUf} options={optionsBar} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Card>
                            <CardContent>
                                <Box padding={2} display="flex" justifyContent="center" alignItems="center"  style={{ height: 250 }}>
                                   <Chart type="bar" data={combinedDataIdade} options={optionsBar} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        </LayOutBaseDePagina>
    );
};
