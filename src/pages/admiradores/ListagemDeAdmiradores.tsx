import { useSearchParams } from "react-router-dom"

import { FerramentasDaListagem } from "../../shared/components"
import { LayOutBaseDePagina } from "../../shared/layouts"
import { useEffect, useMemo } from "react";
import { AdmiradoresService } from "../../shared/services/api/admiradores/AdmiradoresService";
import { error } from "console";
import { useDebounce } from "../../shared/hooks";


export const ListagemDeAdmiradores: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {debounce} = useDebounce(3000, false);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';

    }, [searchParams]);


    useEffect( () => {
        debounce(() => {
            AdmiradoresService.getAll(1, busca)
            .then( (result) => {
                if( result instanceof Error){
                    alert(result.message);
                } else {
                    console.log(result);
                }
            });
        });
    }, [busca]);

    return(
        <LayOutBaseDePagina 
            titulo="Listagem de Admiradores"
            barraDeFerramentas={
                <FerramentasDaListagem 
                   textoBotaoNovo="Novo"
                   mostrarInputBusca={true}
                   textoDaBusca={busca}
                   aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto}, {replace: true}) }
                />
            }
         >

        </LayOutBaseDePagina>
    )
}