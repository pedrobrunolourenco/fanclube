import { BarraDeFerramentas } from "../../shared/components";
import { LayOutBaseDePagina } from "../../shared/layouts";

export const DashBoard: React.FC = () => {
    return(

        <LayOutBaseDePagina 
            titulo="Página Inicial" 
            barraDeFerramentas={(
                <BarraDeFerramentas 
                   mostrarInputBusca
                   textoBotaoNovo="Nova"
                />
            )}>
        </LayOutBaseDePagina>
    );
}