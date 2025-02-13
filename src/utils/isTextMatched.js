import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function isTextMatched(tag, match) {
  if (tag !== undefined && match !== "") {
    if (tag.toLocaleLowerCase() === match.toLocaleLowerCase()) {
      return true;
    }
    return false;
  }
  return false;
}

function getStatusColors(status) {
  switch (status) {
    case "error":
      return ['#639D49', '#fff']; 
      break;
    case "success":
      return ['#28a745', '#fff'];
      break;
    case "warning":
      return ['#ffc107', '#000']; 
      break;
    case "info":
      return ['#17a2b8', '#fff']; 
      break;
    case "danger":
      return ['#dc3545', '#fff']; 
      break;
    case "neutral":
      return ['#6c757d', '#fff'];
      break;
    default:
      return ['#f8f9fa', '#000']; 
      break;
  }
}

export const showAlert = (msg,type="info") => {
  const [background,color] = getStatusColors(type);
  MySwal.fire({
    title: msg,
    toast: true,
    position: 'bottom-end',
    background: background,
    color: color,
    showConfirmButton: false,
    timer: 3000,
    showCloseButton: true,
  });
};