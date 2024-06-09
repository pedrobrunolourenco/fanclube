import { FerramentasDeDetalhe } from "../../shared/components";
import { LayOutBaseDePagina } from "../../shared/layouts";

export const DashBoard: React.FC = () => {
    return(

        <LayOutBaseDePagina 
            titulo="Página Inicial" 
            barraDeFerramentas={(
                <FerramentasDeDetalhe
                   mostrarBotaoSalvarEFechar
                   mostrarBotaoNovo
                />
            )}>
        </LayOutBaseDePagina>
    );
}


