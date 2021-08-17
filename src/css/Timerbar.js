import styled from "styled-components";

export const Circular = styled.div `
    width : 300px;
    height : 300px;
    border-radius : 50%;
    position : relative;
    display : flex;    
    justify-content : center;
    overflow : hidden;
    
`

export const InnerCircular = styled.div `
background : white;
width : 270px;
height : 270px;
border-radius : 50%;
position : absolute;
align-self : center;
color : black;
display : flex;
justify-content : center;
font-size : 3rem;
align-items : center;
`

export const OuterTimerLeft = styled.div `
    width : 100%;
    height : 100%;
    background : #DF0D00;
    position : absolute;
    clip-path : inset(0px 100px 0px 0px);
    border-radius : 50%;
`
    export const ProgressLeft = styled.div `
    width : 100%;
    height : 100%;
    background : #EF3100;
    animation : rotate 0.5s linear both;
    clip-path : inset(0px 0px 0px 200px);
    animation-delay : 0.5s;
    @keyframes rotate {
        100% {
            transform : rotate(180deg);

        }
    }
`


export const OuterTimerRight = styled.div `
    width : 100%;
    height : 100%;
    background : #DF0D00;
    position : absolute;
    clip-path : inset(0px 0px 0px 200px);
    border-radius : 50%;
`

export const ProgressRight = styled.div `
width : 100%;
height : 100%;
background : #EF3100;
animation : rotate 0.5s linear both;
clip-path : inset(0px 200px 0px 0px);
@keyframes rotate {
    100% {
        transform : rotate(180deg);

    }
}
`


