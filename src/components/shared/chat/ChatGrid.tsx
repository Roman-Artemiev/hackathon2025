import type GridItem from "@/structures/GridItem";

interface IChatGrid{
    gridItems: GridItem[];
}



export default function ChatGrid({gridItems} : IChatGrid){
    return(
        <>
        <div className="grid-cols-2 grid">
            {/* <div className="">
            {
                gridItems?.map((item)=>(
                <>
                {item.author == 0 && <>
                    {item.text}
                </>}
                </>  
                ))
            } */}
            {
                gridItems?.map((item)=>(
                <>
                {item.author == 0 && <>
                <div className="col-span-2 bg-amber-700">
                    {item.text}
                </div>    
                </>}
                </>  
                ))
            }

            {
                gridItems?.map((item)=>(
                <>
                {item.author == 1 && <>
                <div className="col-span-2 col-start-2 col-end-3 self-end content-end">
                    {item.text}
                </div>    
                </>}
                </>  
                ))
            }
            
        </div>
        </>
    );
}