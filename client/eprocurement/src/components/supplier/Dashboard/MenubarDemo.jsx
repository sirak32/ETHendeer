
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';

const TabMenuDemo = () => {

    const [activeIndex, setActiveIndex] = useState(3);

    const items = [
        {label: 'Home',url:'/', icon: 'pi pi-fw pi-home'},
        {label: 'Login',url:'/', icon: 'pi pi-fw pi-calendar'},
        {label: 'Register As A Supplier',url:'/', icon: 'pi pi-fw pi-pencil'},
        {label: 'Documentation',url:'/', icon: 'pi pi-fw pi-file'},
        {label: 'Settings',url:'/', icon: 'pi pi-fw pi-cog'}
    ];

    return (
        <div>
            <div className="card flex align-content-end justify-content-center bg-yellow-500">
                <TabMenu style={{color:'#652541'}} model={items} />
            </div>
            
        </div>
    );
}
                 export default TabMenuDemo