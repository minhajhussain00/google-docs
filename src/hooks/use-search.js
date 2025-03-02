import { parseAsString, useQueryState } from "nuqs";

export function useSearchParam(key){
    return useQueryState(
        key,
        parseAsString.withDefault("").withOptions({clearOnDefault:true})
    )
}
