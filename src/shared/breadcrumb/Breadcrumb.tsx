import React from 'react';

interface BreadcrumbProps {
    breadcrumbsItems: string[],
    onItemClick: Function
}

export const Breadcrumb: React.FC<BreadcrumbProps> = (
    {
        breadcrumbsItems, onItemClick
    }
) => {
    return(
        <div className="text-sm breadcrumbs">
            <ul>
                {breadcrumbsItems.map(bi => {
                    if(bi === "Home"){
                        return <li key={bi} onClick={() => onItemClick("Home")} className="hover:cursor-pointer">{bi}</li>
                    }else{
                        return <li key={bi} className="font-bold">{bi}</li>
                    }
                })}
            </ul>
        </div>
    )

}