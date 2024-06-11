import { useNavigate, useParams } from "react-router-dom";
import { LayOutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";



export const DetalheDeAdmiradores: React.FC = () => {

    const { id = 'novo'}  = useParams<'id'>();
    const navigate = useNavigate();

    return(
        <LayOutBaseDePagina 
            titulo="Detalhe do Admirador"
            barraDeFerramentas={
                <FerramentasDeDetalhe 
                   textoBotaoNovo="Novo"
                   mostrarBotaoSalvarEFechar
                   mostrarBotaoApagar = {id !== "novo"}
                   mostrarBotaoNovo = {id !== "novo"}

                   aoClicarEmSalvar={ () => {} }
                   aoClicarEmSalvarEFechar={ () => {} }
                   aoClicarEmApagar={ () => {} }
                   aoClicarEmNovo={ () => {navigate('/admiradores/detalhe/novo')} }
                   aoClicarEmVoltar={ () => {navigate('/admiradores')} }

                />
            }
        >

         </LayOutBaseDePagina>
    )

}