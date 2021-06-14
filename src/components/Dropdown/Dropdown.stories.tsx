import { Story, Meta } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from "../Button/Button";
import { Dropdown, DropdownProps, ItemSelection } from './Dropdown';

export default {
    title: 'Components/Atoms/Dropdown',
    component: Dropdown,
    argTypes: {
        listItems: {
            description: 'The items to list in the dropdown. Must follow the prescribed data structure'
        },
        onItemClick: {
            description: 'Function to call on dropdown item click'
        },
        dropdownMethod: {
            description: 'How to trigger the dropdown, either through hover or click',
        },
        placement: {
            description: 'Where to place the dropdown in relation to its child component',
        },
        visible: {
            description: 'Whether the dropdown is visible on the child component or not'
        },
        overridingClass: {
            description: 'A CSS class that can be passed in to override the component\'s native styling, from root'
        },
    }
} as Meta;


const BTC_LOGO = <svg width="17px" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 4091.27 4091.73">
    <path fill="#F7931A" fill-rule="nonzero" d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z" />
    <path fill="white" fill-rule="nonzero" d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z" />
</svg>;

const ETH_LOGO = <svg width="11px" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 784.37 1277.39">
    <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 " />
    <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 " />
    <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 " />
    <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 " />
    <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 " />
    <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 " />
</svg>;

const ZENO_LOGO = <svg width="15px" viewBox="0 0 84.37 94.37" data-name="Ebene 1">
    <path id="svg_8" fill-rule="evenodd" fill="#000000" d="m63.14,11.82l-21.06,-11.82l-42.08,23.61l0,47.13l42.08,23.62l42.08,-23.62l0,-47.13l-21,-11.79l-0.02,0zm-3.24,5.78l17.62,9.89l0,39.38l-35.44,19.87l-35.41,-19.87l0,-39.38l35.41,-19.89l17.82,10z" />
    <path id="svg_9" fill-rule="evenodd" fill="#000000" d="m52.67,39.26l5.74,-7.93l0,-8.43l-32.59,0l0,8.77l21.45,0l-5.5,7.59l10.9,0zm-7.22,10l3.16,-4.37l-10.89,0l-3.17,4.37l10.9,0zm-20.91,13.77l0,8.43l35.13,0l0,-8.72l-24,0l5.71,-7.87l-10.89,0l-5.95,8.16z" />
</svg>;


const LIST_ITEMS = [
    {
        value: '1st menu item',
        isDisabled: true
    },
    {
        value: '2nd menu item',
    },
    {
        value: 3
    }
];

const COIN_ITEMS = [
    {
        value: <span>BTC <span style={{ verticalAlign: 'middle', marginLeft: '3px' }}>{BTC_LOGO}</span></span>
    },
    {
        value: <span>ETH <span style={{ verticalAlign: 'middle', marginLeft: '3px' }}>{ETH_LOGO}</span></span>
    },
    {
        value: <span>ZENO <span style={{ verticalAlign: 'middle', marginLeft: '3px', marginBottom: '-2px' }}>{ZENO_LOGO}</span></span>
    },
];

const Template: Story<DropdownProps & { children: React.ReactElement[] }> = (args) => {
    const [selected, setSelected] = useState(0);

    const onItemSelect = (item: ItemSelection) => {
        let index = parseInt(item.key);
        setSelected(index);
    }

    return (
        <div>
            <div style={{ width: '110px', display: 'inline-block' }}>
                <Dropdown {...args} />
            </div>

            <div style={{
                width: '150px',
                display: 'inline-block',
                marginLeft: '20px',
                boxSizing: 'border-box',
                borderRadius: '4px',
                position: 'relative',
                border: '1px solid black',
                cursor: 'pointer'
            }}>
                <Dropdown
                    onItemClick={onItemSelect}
                    dropdownMethod={args.dropdownMethod}
                    listItems={COIN_ITEMS}>
                    <div style={{
                        padding: '8px 10px',
                        fontSize: '.9rem',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        {COIN_ITEMS[selected].value}
                        <svg style={{ marginTop: '5px' }} x="0px" y="0px" width="10px" height="10px" viewBox="0 0 451.847 451.847">
                            <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                                c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                                c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
                        </svg>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};

export const Hover = Template.bind({});
Hover.args = {
    dropdownMethod: 'hover',
    listItems: LIST_ITEMS,
    children: [
        <Button mainColour="#000" variant="outlined">Hover me</Button>
    ]
};

export const Click = Template.bind({});
Click.args = {
    dropdownMethod: 'click',
    listItems: LIST_ITEMS,
    children: [
        <Button mainColour="#000" variant="outlined">Click me</Button>
    ]
};