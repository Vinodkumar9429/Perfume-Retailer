import localFont from "next/font/local";

export const generalSans = localFont({
    src:[
        {path:"./_private/fonts/GeneralSans-Light.otf", weight:"200", style:"normal"},
        {path:"./_private/fonts/GeneralSans-Regular.otf", weight:"400", style: "normal"},
        {path:"./_private/fonts/GeneralSans-Semibold.otf", weight:"700", style:"normal"}
    ],
    display:"swap",
    variable:"--font-general-sans"
})


export const leJourSerif = localFont({
    src:"/_private/fonts/LeJourSerif.otf", weight:"400", style:"normal",
    display:"swap",
    variable:"--font-lejour"
})