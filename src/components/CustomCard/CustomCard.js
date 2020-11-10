import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
    width: 100%;
    border-top: 5px solid #3498db;
    background: #fff;
`;

const CustomCard = ({ children }) => {
    return (
        <CardContainer className='rounded shadow-sm border-left border-right border-bottom p-3'>
            {children}
        </CardContainer>
    )
}

export default CustomCard
