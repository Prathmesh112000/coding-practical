import React,{useEffect,useState} from 'react'
import { Flex, Input } from '@chakra-ui/react'
import styles from "../styles/search.module.css"
import axios from "axios"
import ProductAddToCart from "./Card"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
   
    Button
  } from '@chakra-ui/react'
  import { ChevronDownIcon } from '@chakra-ui/icons'

function Search() {
    const [data,setdata]=useState([])
    const [tempstore,settempstore]=useState([])
    const [searchdata,setsearchdata]=useState([])
    const [menudata,setmenudata]=useState("Defalut")
    const [sortdata,setsortdata]=useState("Defalut")
    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products").then(res=>{
            setdata(res.data);
            settempstore(res.data)
        })
    },[])

    const datatype=(str1,str2)=>{
            if(str1=="price" && str2=="High To Low"){

                const datatemp=data.sort((a,b)=>{
                    return +b.price - +a.price
                })
                console.log(data)
                setdata([...datatemp]);

            }
            else if(str1=="price" && str2=="Low To High"){
                const datatemp=data.sort((a,b)=>{
                    return +a.price - +b.price
                })
                setdata([...datatemp]);
            }
            else if(str1=="Rating" && str2=="Low To High"){
                const datatemp=data.sort((a,b)=>{
                    return +a.rating.rate - +b.rating.rate
                })
                setdata([...datatemp]);
            }
            else if(str1=="Rating" && str2=="High To Low"){
                const datatemp=data.sort((a,b)=>{
                    return +b.rating.rate - +a.rating.rate
                })
                setdata([...datatemp]);
            }
            else if(str1=="Count" && str2=="High To Low"){
                const datatemp=data.sort((a,b)=>{
                    return +b.rating.count - +a.rating.count
                })
                setdata([...datatemp]);
            }
            else if(str1 =="Default" || str2== "Default"){
                axios.get("https://fakestoreapi.com/products").then(res=>{
                    setdata(res.data);
                    settempstore(res.data)
                })
            }
    }
    const deletedata=(id)=>{
       const temparr=[]
       data.map(elem=>{
        if(elem.id!=id){
            temparr.push(elem)
        }
        else{
            elem.id=10000
        }
       })

       setdata([...temparr])
    }

    const  searchelem=(searchdata)=>{
        var t=[]
        console.log("trigger");
        data.map(elem=>{
            if(elem.title.includes(searchdata) ){
                t.push(elem)
            }
        })
        console.log(tempstore)
        setdata([...t])
    }

  return (
    <>
    <Flex gap={"10"} justifyContent="center" >
    <Input placeholder='Basic usage' size='md'width="lg" className='inptag' type="text" value={searchdata} onChange={(e)=>{
         console.log(e);
         setsearchdata(e.target.value)
         searchelem(e.target.value)
    }} />
    {/* drop down */}

    <Menu onChange={()=>{
        console.log("chg occ")
    }}>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    {menudata}
  </MenuButton>
  <MenuList>
    <MenuItem onClick={()=>{
        setmenudata("price")
        datatype("price",sortdata)
    }}>Price</MenuItem>
    <MenuItem onClick={()=>{
        setmenudata("Rating")
        datatype("Rating",sortdata)
    }}>Rating</MenuItem>
    <MenuItem onClick={()=>{
        setmenudata("Count")
        datatype("Count",sortdata)
    }}>Count</MenuItem>

<MenuItem onClick={()=>{
        setmenudata("Default")
        datatype("Default",sortdata)
    }}>Defalut</MenuItem>
  </MenuList>
  
</Menu>


<Menu >
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    {sortdata}
  </MenuButton>
  <MenuList>
    <MenuItem onClick={(e)=>{
        setsortdata("High To Low")
        datatype(menudata,"High To Low")
    }}>High To Low</MenuItem>
    <MenuItem onClick={(e)=>{
        setsortdata("Low To High")
        datatype(menudata,"Low To High")
    }}>Low To High</MenuItem>
    <MenuItem onClick={(e)=>{
        setsortdata("Defalut")
        datatype(menudata,"Default")
    }}>Defalut</MenuItem>
  </MenuList>
</Menu>
    
    </Flex>
    <div className={styles.container}>
   {console.log(data)}
    {data.map(elem=>(
       
            <ProductAddToCart {...elem} deletedata={deletedata}/>

        
    ))}
    </div>
    </>
  )
}

export default Search