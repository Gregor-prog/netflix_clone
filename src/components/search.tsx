import { useState } from "react"
export function Searchcomp(){
    const [search,setsearch] = useState("")
    return <div>
        <input type="text" value={search} onChange={(e) => setsearch(e.target.value)}/>
        <div></div>
    </div>
}