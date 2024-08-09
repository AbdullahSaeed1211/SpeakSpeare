import { IconLink } from "@tabler/icons-react";

export default function LinkPaste({ handleLinkPaste }) {
    return (
       <label htmlFor="link-input" className="cursor-pointer"> 
       <IconLink size={21} className="text-[#ffffff]" />
       <input type="text" id="link-input" className="hidden" onChange={handleLinkPaste} />
       </label>
    )
}