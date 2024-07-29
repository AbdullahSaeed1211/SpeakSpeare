export default function IconButton({Icon,Onclick}) {
  return <span className="cursor-pointer flex items-center space-x-2" 
  Onclick={Onclick}>
    <Icon size={22}/>
  </span>;
}
