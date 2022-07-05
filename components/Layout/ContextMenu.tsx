import { css } from '@emotion/react'
import styled from '@emotion/styled'

type ContextMenuProps = {
  top: number
  left: number
}

export const ContextMenu = styled.div<ContextMenuProps>`
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
  z-index: 1000;
  width: 220px;
  background-color: #282828;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.6);
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    list-style-type: none;
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
  }
  ul li {
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
  }
  ul li:hover {
    cursor: pointer;
    background-color: #4b4b4b;
  }
`
