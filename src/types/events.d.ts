/**资源事件 */
export type SLTEventResource = 'PROGRESS' | 'END';
/**时钟事件 */
export type SLTEventClock = 'TICK';
/**键盘事件(开发人员编写) */
export type SLTEventKeyboard = 'KEY_DOWN' | 'KEY_UP';
/**DOM节点事件(开发人员编写) */
export type SLTEventElement = 'RESIZE' | SLTEventKeyboard | 'MOUSE_MOVE' | 'MOUSE_DOWN' | 'MOUSE_UP' | 'CLICK' | 'DOUBLE_CLICK' | 'WHEEL';
/**初始化标识 INIT_PICK  */
export type SLTEventINIT = 'INIT_PICK'

/**键盘按键事件Code */
export type SLTEventKeyCode = 'Escape'
    | 'Backquote' | 'Minus' | 'Equal' | 'Backspace'
    | 'Tab' | 'Backslash'
    | 'CapsLock' | 'Semicolon' | 'Quote' | 'Enter'
    | 'Comma' | 'Period' | 'Slash'
    | 'MetaLeft' | 'Space' | 'ContextMenu'
    | `${'Alt' | 'Bracket' | 'Control' | 'Shift'}${'Left' | 'Right'}`
    | `Key${'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'}`
    /**Digit 主键盘上方数字表 Numpad 数字键盘*/
    | `${'Digit' | 'Numpad' | 'F'}${'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'}` | 'F10' | 'F11' | 'F12'
    | `Numpad${'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Enter' | 'Decimal'}` | 'NumLock'
    | `Arrow${'Down' | 'Left' | 'Right' | 'Up'}`;

/**整体综合事件 */
export type SLTEvents = SLTEventClock | SLTEventResource | SLTEventElement | SLTEventINIT | 'PICKED' | 'PROGRESS' | 'END';