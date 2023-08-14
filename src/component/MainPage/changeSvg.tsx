import { RiSwitchLine, RiXboxLine } from "react-icons/ri";
import { SiOculus, SiPlaystation4, SiPlaystation5 } from "react-icons/si";
import { FaLinux } from "react-icons/fa";
import { AiOutlineApple, AiOutlineWindows } from "react-icons/ai";

export const changeSvg = (platform: React.ReactNode) => {
  switch (platform) {
    case "FaLinux":
      return <FaLinux style={{ width: "24px", height: "24px" }} />;
    case "AiOutlineWindows":
      return <AiOutlineWindows style={{ width: "24px", height: "24px" }} />;
    case "AiOutlineApple":
      return <AiOutlineApple style={{ width: "24px", height: "24px" }} />;
    case "SiPlaystation4":
      return <SiPlaystation4 style={{ width: "24px", height: "24px" }} />;
    case "RiSwitchLine":
      return <RiSwitchLine style={{ width: "24px", height: "24px" }} />;
    case "SiPlaystation5":
      return <SiPlaystation5 style={{ width: "24px", height: "24px" }} />;
    case "RiXboxLine":
      return <RiXboxLine style={{ width: "24px", height: "24px" }} />;
    case "SiOculus":
      return <SiOculus style={{ width: "24px", height: "24px" }} />;
    default:
      return null;
  }
};
