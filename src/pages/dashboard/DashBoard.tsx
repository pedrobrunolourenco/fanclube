import { FerramentasDaListagem } from "../../shared/components";
import { LayOutBaseDePagina } from "../../shared/layouts";

export const DashBoard: React.FC = () => {
    return(

        <LayOutBaseDePagina 
            titulo="Página Inicial" 
            barraDeFerramentas={(
                <FerramentasDaListagem 
                   mostrarInputBusca
                   textoBotaoNovo="Nova"
                />
            )}>
        </LayOutBaseDePagina>
    );
}