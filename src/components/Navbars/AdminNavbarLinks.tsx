


// ** Importing external libraries **
  
  import {
    Box, Button,
    Flex, 
    Stack, Text,
    Image
  } from "@chakra-ui/react";

  import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"

  // Icons
  import { ProfileIcon, SettingsIcon } from "@components/Icons/Icons";
  import { BellIcon } from "@chakra-ui/icons";

  // Hooks
  import {useEffect} from "react";
  import { useColorModeValue } from "@components/ui/color-mode";
  import { useColorMode } from "@components/ui/color-mode";
  import { useSelector, useDispatch } from 'react-redux'; //redux
  import { useNavigate } from "react-router-dom";

  // Components
  import { NavLink } from "react-router-dom";

// ** Relative imports **

  // Routes
  import routes from "@/routes";

  // Assets
  import citec_png from "@assets/img/CITEC.png";
  import tecun_png from "@assets/img/TECUN_isotipo.png";
  import medallon_naranja from "@assets/img/Medallones Tecun-04.png" // color naranja
  import avatar1 from "@assets/img/avatars/avatar1.png";
  import avatar2 from "@assets/img/avatars/avatar2.png";
  import avatar3 from "@assets/img/avatars/avatar3.png";

  // Components  
  import { ItemContent } from "@components/Menu/ItemContent";
  import { LoginItemContent } from "@components/MenuLogin/LoginItemContent";
  import { SearchBar } from "@components/Navbars/SearchBar/SearchBar";
  import { SidebarResponsive } from "@components/Sidebar/Sidebar";
  import CasoListEquiposNavbar from "@/components/Casos/CasoListEquiposNavbar";

  
  
  // Custom Hooks

  // Defining Types
  import { ReduxState } from "@/types/Redux";
  import { UserData } from "@/types/User";

// ** Style Imports **




interface HeaderLinksProps {
  variant?: string;
  children?: React.ReactNode;
  fixed?: boolean;
  scrolled?: boolean;
  secondary?: boolean;
  onOpen?: () => void;
}






export default function HeaderLinks(props: HeaderLinksProps) {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  /*=======================================================
     BLOQUE: REDUX-PERSIST
     DESCRIPTION: 
    =========================================================*/
    
    const userData = useSelector((state:ReduxState) => state.userData);  // Acceder al JSON desde el estado
    const dispatch = useDispatch();

    const saveUserData = (json:UserData) => {
        dispatch({ type: 'SET_USER_DATA', payload: json });
      };
  
    /*const getUserData = () => {
        dispatch({ type: 'GET_USER_DATA' });  // Despachar la acción para obtener datos
    };*/

    /*====================FIN BLOQUE: REDUX-PERSIST ==============*/

    const navigate = useNavigate();
  
    const display_perfil = {
      '1': 'Técnio',
      '2': 'Especialista',
      '3': 'admin'
    }[userData?.login?.perfil_ID || '1']

  const { colorMode } = useColorMode();

  // Chakra Color Mode
  let navbarIcon =
    fixed && scrolled
      ? useColorModeValue("gray.700", "gray.200")
      : useColorModeValue("white", "gray.200");
  //let menuBg = useColorModeValue("white", "navy.800");
  if (secondary) {
    navbarIcon = "white";
  }


  useEffect( () =>{
    if(userData.login.isLogged == false){ 
      navigate('/auth/signin')
    }
  },[userData])


  /**
   * Función para cerrar sesión
   */
  const handleLogout = async() =>{
    const newUserData = structuredClone(userData)

    newUserData.login = {isLogged:false};

    saveUserData(newUserData)

    if(userData.login.isLogged == false){ 
      navigate('/auth/login')
    }
  }
 

  

  return (
    <Flex
      pe={{sm: "0px", md: "16px" }}
      w={{xs:"100%", sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'>
      <SearchBar me='18px' w={{xs:"auto", sm:"auto"}} display={{xs:"block",sm:"block"}} />
      
      {
        Object.keys(userData?.login || {}).length == 0 ? (
          <NavLink to='/auth/signin'>
            <Button
              ms='0px'
              px='0px'
              me={{ sm: "2px", md: "16px" }}
              color={navbarIcon}
              variant='no-effects'
              rightIcon={
                document.documentElement.dir ? (
                  ""
                ) : (
                  <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
                )
              }
              leftIcon={
                document.documentElement.dir ? (
                  <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
                ) : (
                  ""
                )
              }>
              <Text display={{ xs:"none", sm: "none", md: "block"}}>{userData?.login?.display_name || ''}</Text>
            </Button>
          </NavLink>
        ):(

            <MenuRoot>
                <MenuTrigger asChild>
                    <Button
                        ms='0px'
                        px='0px'
                        me={{ sm: "2px", md: "16px" }}
                        color={navbarIcon}
                        variant='plain'
                    >
                        {
                            // leftIcon
                            document.documentElement.dir ? (
                                <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
                            ) : (
                                ""
                            )
                        }
                        <Text display={{ xs:"none", sm: "none", md: "flex" }}>{userData?.login?.display_name || ''}</Text>
                        {
                            // rightIcon
                            document.documentElement.dir ? (
                                ""
                            ) : (
                                <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
                            )
                        }
                    </Button>
                </MenuTrigger>
                <MenuContent>
                <Flex flexDirection='column'>
                    <MenuItem value="display_perfil" borderRadius='8px' mb='10px'>
                        <LoginItemContent
                            time={userData?.login?.display_name || ''}
                            info= {`Codigo: ${userData.login.ID}`} 
                            boldInfo={display_perfil}
                            aName='Alicia'
                            aSrc={avatar1}
                        />
                    </MenuItem>
                    <MenuItem value="Payment" borderRadius='8px'>
                        <LoginItemContent
                            time='3 days ago'
                            info='Payment succesfully completed!2'
                            boldInfo=''
                            aName='Kara'
                            aSrc={avatar3}
                            type="buttom"
                            handleLogout={handleLogout}
                        />
                    </MenuItem>
                </Flex>
                </MenuContent>
            </MenuRoot>
        )
      }
      
      
      
      
    

      <CasoListEquiposNavbar props={props} />

      <SettingsIcon
        cursor='pointer'
        ms={{ base: "16px", xl: "0px" }}
        me='16px'
        onClick={props.onOpen}
        color={navbarIcon}
        w='18px'
        h='18px'
      />

    <MenuRoot>
        <MenuTrigger asChild>
            <BellIcon color={navbarIcon} w='18px' h='18px' />
        </MenuTrigger>
        <MenuContent>
        <Flex flexDirection='column'>
            <MenuItem value="new-message" borderRadius='8px' mb='10px'>
              <ItemContent
                time='13 minutes ago'
                info='from Alicia'
                boldInfo='New Message'
                aName='Alicia'
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem value="new-album" borderRadius='8px' mb='10px'>
              <ItemContent
                time='2 days ago'
                info='by Josh Henry'
                boldInfo='New Album'
                aName='Josh Henry'
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem value="payment-succesfully" borderRadius='8px'>
              <ItemContent
                time='3 days ago'
                info='Payment succesfully completed!'
                boldInfo=''
                aName='Kara'
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuContent>
    </MenuRoot>

      <SidebarResponsive
        ms={{ base: "16px", xl: "0px" }}
        hamburgerColor={"white"}
        logo={
          <Stack direction='row' align='center' justify='center'>
            {colorMode === "dark" ? (
                <Image
                  src={citec_png}
                  alt="Imagen de ejemplo"
                  borderRadius="lg"
                  w={{xs:"75px",sm:"50px",md:"75px"}}
                />
            ) : (
                <Image
                  src={citec_png}
                  alt="Imagen de ejemplo"
                  borderRadius="lg"
                  w={{xs:"75px",sm:"50px",md:"75px"}}
                />
            )}
            <Box
              w='1px'
              h='20px'
              bg={colorMode === "dark" ? "white" : "gray.700"}
            />
            {colorMode === "dark" ? (
              <Image
                src={tecun_png}
                alt="Imagen de ejemplo"
                borderRadius="lg"
                w={{xs:"75px",sm:"50px",md:"75px"}}
              />
            ) : (
              <Image
                src={medallon_naranja}
                alt="Imagen de ejemplo"
                borderRadius="lg"
                w={{xs:"75px",sm:"50px",md:"75px"}}
              />
            )}
          </Stack>
        }
        colorMode={colorMode}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />


    </Flex>
  );
}