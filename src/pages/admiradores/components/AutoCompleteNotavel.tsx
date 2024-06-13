import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { NotaveisService } from "../../../shared/services/api/notaveis/NotaveisService";

type TAutoCompleteOption = {
   id: number;
   label: string;
};

export const AutoCompleteNotavel: React.FC = () => {
   const { debounce } = useDebounce();
   const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [busca, setBusca] = useState("");
   const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

   useEffect(() => {
      setIsLoading(true);
      debounce(() => {
         NotaveisService.getAll(1, busca)
            .then((result) => {
               setIsLoading(false);
               if (result instanceof Error) {
                  // Trate o erro conforme necessário
               } else {
                  setOpcoes(result.data.map(notavel => ({ id: notavel.id, label: notavel.nome })));
               }
            });
      });
   }, [busca]);

   const autoCompleteSelectedOption = useMemo(() => {
      if (!selectedId) return null;
      const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
      return selectedOption || null;
   }, [selectedId, opcoes]);

   return (
      <div>
         <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem Opções"
            loadingText="Carregando..."
            disablePortal
            value={autoCompleteSelectedOption}
            loading={isLoading}
            popupIcon={isLoading ? <CircularProgress size={28} /> : undefined}
            onInputChange={(e, newValue) => setBusca(newValue)}
            options={opcoes}
            onChange={(event, newValue) => {
               setSelectedId(newValue?.id);
               setBusca(""); // Limpa a busca após selecionar uma opção
            }}
            renderInput={(params) => (
               <TextField
                  {...params}
                  label="Meu fã Número 1"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
               />
            )}
         />
      </div>
   );
};