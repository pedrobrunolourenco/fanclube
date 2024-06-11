import { useNavigate, useParams } from "react-router-dom";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { AdmiradoresService } from "../../shared/services/api/admiradores/AdmiradoresService";
import { LinearProgress } from "@mui/material";



export const DetalheDeAdmiradores: React.FC = () => {

    const { id = 'novo'}  = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState("");

    
    const handleDelete = (id: number) => {
        AdmiradoresService.deleteById(id)
        .then(result => {
            if (result instanceof Error) {
              alert(result.message);
            } else {
               alert('Registro apagado com sucesso!');
               navigate('/admiradores');
            }
        });
    }

    useEffect( () => {
        if(id !== "novo"){
           setIsLoading(true);

           AdmiradoresService.getById(Number(id))
             .then( (result) => {
                setIsLoading(false);
                if( result instanceof Error ) {
                    alert(result.message);
                    navigate('/admiradores');
                } else {
                   setNome(result.nomeCompleto);                    
                   console.log(result);
                }
             });
        }
    }, [id] );

    return(
        <LayOutBaseDePagina 
            titulo={id === "novo" ? 'Novo Admirador' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                   textoBotaoNovo="Novo"
                   mostrarBotaoSalvarEFechar
                   mostrarBotaoApagar = {id !== "novo"}
                   mostrarBotaoNovo = {id !== "novo"}

                   aoClicarEmSalvar={ () => {} }
                   aoClicarEmSalvarEFechar={ () => {} }
                   aoClicarEmApagar={ () => handleDelete(Number(id)) }
                   aoClicarEmNovo={ () => {navigate('/admiradores/detalhe/novo')} }
                   aoClicarEmVoltar={ () => {navigate('/admiradores')} }

                />
            }
        >

            { isLoading &&
                (
                    <LinearProgress variant="indeterminate" />
                )
            }

         </LayOutBaseDePagina>
    )

}