export const styles = {
    boardEmptyMsg: {
        // position: 'relative',
        // left: 0,
        // width: '78%',
        textAlign: 'center',
        // backgroundColor: '#5c6bc0',
        // marginLeft: 100,
    } as React.CSSProperties,

    boardHeader: {
        width: '70em',
        display: 'flex',
        zIndex: 1100,
        boxSizing: 'border-box',
        flexShrink: 0,
        flexDirection: 'column',
    } as React.CSSProperties,

    progressHraderTxtUL: {
        display: 'flex',
        listStyle: 'none',
        margin: 3,
        flexDirection: 'row',
        textDecoration: 'none',
        paddingInlineStart: 2,
    } as React.CSSProperties,

    FirstCol: {
        backgroundColor: '#c5cae9',
        textDecoration: 'none',
        // minWidth: '40%',
        margin: 0,
        padding: 10,
    } as React.CSSProperties,

    progressHraderTxtLI: {
        flexShrink: 1,
        flexGrow: 0,
        border: '1px solid #ddd',
        padding: 0,
        margin: 0,
        backgroundColor: '#c5cae9',
        textDecoration: 'none',
        // minWidth: '20%',
    } as React.CSSProperties,

    progressHeaderLine: {
        display: 'flex',
        flexDirection: 'row',
    } as React.CSSProperties,

    pulseUL:{
        display: 'flex',
        listStyle: 'none',
        margin: 3,
        flexDirection: 'row',
        textDecoration: 'none',
        paddingInlineStart: 2,
    } as React.CSSProperties,

    pulseLI :{
        flexShrink: 1,
        flexGrow: 0,
        border: '1px solid #5c6bc0',
        padding: 10,
        margin: 0,
        backgroundColor: '#c5cae9',
        textDecoration: 'none',
    } as React.CSSProperties,

}