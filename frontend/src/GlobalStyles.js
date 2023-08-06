import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GLOBALSTYLES = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    body{
        background-color: #f0f0f0;
    }

    p, li, a, h1, h2, h3, h4, h5, h6 {
        font-family: "Josefin", sans-serif;
    }
    
    h1{
        font-size: 2.2em;
        font-weight: 600;
    }

    h2{
        font-size: 1.8em;
        font-weight: 600;
    }

    h3{
        font-size: 1.8em;
        font-weight: 600;
    }

    h4{
        font-size: 1.6em;
        font-weight: 600;
    }

    h5{
        font-size: 1.4em;
        font-weight: 600;
    }

    h6{
        font-size: 1.2em;
        font-weight: 600;
    }

    button{
        font-weight: 500;
    }

`

export default GLOBALSTYLES;