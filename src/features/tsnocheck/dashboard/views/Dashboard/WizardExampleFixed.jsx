// @ts-nocheck
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { FiUser, FiSettings, FiCheck, FiMail, FiShield, FiBell, FiMoon, FiZap, FiGlobe, FiLock } from 'react-icons/fi';
import Card from '@dashboard/components/Card/Card';
import CardHeader from '@dashboard/components/Card/CardHeader';
import CardBody from '@dashboard/components/Card/CardBody';
import { Wizard, WizardStepContent } from '@dashboard/components/Wizard';

function WizardExample() {
  const textColor = useColorModeValue('gray.700', 'white');
  const toast = useToast();
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Preferences
    notifications: false,
    theme: 'light',
    language: 'es',
    
    // Step 3: Features Selection (Checkboxes with Icons)
    features: {
      security: false,
      notifications: false,
      darkMode: false,
      performance: false,
      multilingual: false,
      privacy: false,
    },
    
    // Step 4: Additional Info
    bio: '',
    company: '',
    role: '',
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateFeature = (featureName, value) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureName]: value
      }
    }));
  };

  // Custom checkbox with icon component
  const IconCheckbox = ({ icon: Icon, title, description, isChecked, onChange, colorScheme = "blue" }) => {
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const hoverBorderColor = useColorModeValue('blue.300', 'blue.400');
    const checkedBg = useColorModeValue('blue.50', 'blue.900');
    const checkedBorderColor = useColorModeValue('blue.500', 'blue.400');
    
    return (
      <Box
        borderWidth="2px"
        borderColor={isChecked ? checkedBorderColor : borderColor}
        borderRadius="lg"
        p={4}
        cursor="pointer"
        transition="all 0.2s"
        bg={isChecked ? checkedBg : 'transparent'}
        _hover={{
          borderColor: hoverBorderColor,
          transform: 'translateY(-2px)',
          shadow: 'md'
        }}
        onClick={onChange}
        position="relative"
      >
        <VStack spacing={3} align="center" textAlign="center">
          <Box
            p={3}
            borderRadius="full"
            bg={isChecked ? `${colorScheme}.500` : useColorModeValue('gray.100', 'gray.700')}
            color={isChecked ? 'white' : useColorModeValue('gray.600', 'gray.300')}
            transition="all 0.2s"
          >
            <Icon size={24} />
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="md" mb={1}>
              {title}
            </Text>
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {description}
            </Text>
          </Box>
        </VStack>
        
        {/* Checkbox indicator */}
        <Box
          position="absolute"
          top={2}
          right={2}
          w={5}
          h={5}
          borderRadius="sm"
          borderWidth="2px"
          borderColor={isChecked ? `${colorScheme}.500` : borderColor}
          bg={isChecked ? `${colorScheme}.500` : 'transparent'}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {isChecked && (
            <FiCheck color="white" size={12} />
          )}
        </Box>
      </Box>
    );
  };

  const handleStepChange = (stepIndex, step) => {
    console.log(`Changed to step ${stepIndex}:`, step.title);
  };

  const handleComplete = () => {
    toast({
      title: '¡Wizard completado!',
      description: 'Todos los datos han sido guardados exitosamente.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    console.log('Form completed with data:', formData);
  };

  // Define wizard steps
  const wizardSteps = [
    {
      id: 0,
      title: 'Información Personal',
      content: (
        <WizardStepContent
          title="Datos Personales"
          description="Por favor, ingresa tu información personal básica"
          icon={FiUser}
        >
          <VStack spacing={4} align="stretch">
            <SimpleGrid 
              columns={{ base: 1, sm: 2 }} 
              spacing={4}
            >
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Tu nombre"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Apellido</FormLabel>
                <Input
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Tu apellido"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
            </SimpleGrid>
            <SimpleGrid 
              columns={{ base: 1, sm: 2 }} 
              spacing={4}
            >
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="tu@email.com"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
            </SimpleGrid>
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 1,
      title: 'Preferencias',
      content: (
        <WizardStepContent
          title="Configuración de Preferencias"
          description="Personaliza tu experiencia en la plataforma"
          icon={FiSettings}
        >
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Idioma preferido</FormLabel>
              <Select
                value={formData.language}
                onChange={(e) => updateFormData('language', e.target.value)}
                size={{ base: 'md', md: 'md' }}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel>Tema</FormLabel>
              <RadioGroup
                value={formData.theme}
                onChange={(value) => updateFormData('theme', value)}
              >
                <SimpleGrid 
                  columns={{ base: 1, sm: 3 }} 
                  spacing={4}
                  alignItems="center"
                >
                  <Radio value="light" size="lg">Claro</Radio>
                  <Radio value="dark" size="lg">Oscuro</Radio>
                  <Radio value="auto" size="lg">Automático</Radio>
                </SimpleGrid>
              </RadioGroup>
            </FormControl>
            
            <FormControl>
              <Checkbox
                isChecked={formData.notifications}
                onChange={(e) => updateFormData('notifications', e.target.checked)}
              >
                Recibir notificaciones por email
              </Checkbox>
            </FormControl>
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 2,
      title: 'Características',
      content: (
        <WizardStepContent
          title="Selecciona las Características"
          description="Elige las funcionalidades que deseas activar en tu cuenta"
          icon={FiZap}
        >
          <VStack spacing={6} align="stretch">
            <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
              Selecciona todas las características que te gustaría usar
            </Text>
            
            <SimpleGrid 
              columns={{ base: 1, sm: 2, lg: 3 }} 
              spacing={4}
            >
              <IconCheckbox
                icon={FiShield}
                title="Seguridad Avanzada"
                description="Autenticación de dos factores y encriptación"
                isChecked={formData.features.security}
                onChange={() => updateFeature('security', !formData.features.security)}
                colorScheme="green"
              />
              
              <IconCheckbox
                icon={FiBell}
                title="Notificaciones Push"
                description="Recibe alertas en tiempo real"
                isChecked={formData.features.notifications}
                onChange={() => updateFeature('notifications', !formData.features.notifications)}
                colorScheme="blue"
              />
              
              <IconCheckbox
                icon={FiMoon}
                title="Modo Oscuro"
                description="Tema oscuro para mejor experiencia"
                isChecked={formData.features.darkMode}
                onChange={() => updateFeature('darkMode', !formData.features.darkMode)}
                colorScheme="purple"
              />
              
              <IconCheckbox
                icon={FiZap}
                title="Alto Rendimiento"
                description="Optimizaciones para velocidad"
                isChecked={formData.features.performance}
                onChange={() => updateFeature('performance', !formData.features.performance)}
                colorScheme="orange"
              />
              
              <IconCheckbox
                icon={FiGlobe}
                title="Multiidioma"
                description="Soporte para múltiples idiomas"
                isChecked={formData.features.multilingual}
                onChange={() => updateFeature('multilingual', !formData.features.multilingual)}
                colorScheme="teal"
              />
              
              <IconCheckbox
                icon={FiLock}
                title="Privacidad Avanzada"
                description="Control total sobre tus datos"
                isChecked={formData.features.privacy}
                onChange={() => updateFeature('privacy', !formData.features.privacy)}
                colorScheme="red"
              />
            </SimpleGrid>
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 3,
      title: 'Información Adicional',
      content: (
        <WizardStepContent
          title="Detalles Adicionales"
          description="Información opcional sobre tu perfil profesional"
          icon={FiMail}
        >
          <VStack spacing={4} align="stretch">
            <SimpleGrid 
              columns={{ base: 1, sm: 2 }}
              spacing={4}
            >
              <FormControl>
                <FormLabel>Empresa</FormLabel>
                <Input
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="Nombre de tu empresa"
                  size={{ base: 'md', md: 'md' }}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Cargo</FormLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => updateFormData('role', e.target.value)}
                  placeholder="Selecciona tu cargo"
                  size={{ base: 'md', md: 'md' }}
                >
                  <option value="developer">Desarrollador</option>
                  <option value="designer">Diseñador</option>
                  <option value="manager">Gerente</option>
                  <option value="analyst">Analista</option>
                  <option value="other">Otro</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            
            <FormControl>
              <FormLabel>Biografía</FormLabel>
              <Textarea
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                placeholder="Cuéntanos un poco sobre ti..."
                rows={{ base: 3, md: 4 }}
                resize="vertical"
              />
            </FormControl>
          </VStack>
        </WizardStepContent>
      ),
    },
    {
      id: 4,
      title: 'Confirmación',
      content: (
        <WizardStepContent
          title="Revisar Información"
          description="Verifica que toda la información sea correcta antes de continuar"
          icon={FiCheck}
        >
          <VStack spacing={4} align="stretch">
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Text fontSize={{ base: "sm", md: "md" }}>
                Por favor revisa toda la información antes de finalizar.
              </Text>
            </Alert>
            
            <SimpleGrid 
              columns={{ base: 1, lg: 2 }}
              spacing={4}
            >
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md" 
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Información Personal:
                </Text>
                <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
                  <Text>Nombre: {formData.firstName} {formData.lastName}</Text>
                  <Text>Email: {formData.email}</Text>
                  <Text>Teléfono: {formData.phone}</Text>
                </VStack>
              </Box>
              
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md" 
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Preferencias:
                </Text>
                <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
                  <Text>Idioma: {formData.language}</Text>
                  <Text>Tema: {formData.theme}</Text>
                  <Text>Notificaciones: {formData.notifications ? 'Activadas' : 'Desactivadas'}</Text>
                </VStack>
              </Box>
            </SimpleGrid>
            
            {/* Features Selected */}
            {Object.values(formData.features).some(Boolean) && (
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md"
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Características Seleccionadas:
                </Text>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} fontSize={{ base: "sm", md: "md" }}>
                  {formData.features.security && <Text>✅ Seguridad Avanzada</Text>}
                  {formData.features.notifications && <Text>✅ Notificaciones Push</Text>}
                  {formData.features.darkMode && <Text>✅ Modo Oscuro</Text>}
                  {formData.features.performance && <Text>✅ Alto Rendimiento</Text>}
                  {formData.features.multilingual && <Text>✅ Multiidioma</Text>}
                  {formData.features.privacy && <Text>✅ Privacidad Avanzada</Text>}
                </SimpleGrid>
              </Box>
            )}
            
            {(formData.company || formData.role || formData.bio) && (
              <Box 
                p={{ base: 3, md: 4 }} 
                borderWidth="1px" 
                borderRadius="md"
                bg={useColorModeValue('gray.50', 'gray.700')}
              >
                <Text fontWeight="bold" mb={2} fontSize={{ base: "sm", md: "md" }}>
                  Información Adicional:
                </Text>
                <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
                  {formData.company && <Text>Empresa: {formData.company}</Text>}
                  {formData.role && <Text>Cargo: {formData.role}</Text>}
                  {formData.bio && <Text>Biografía: {formData.bio}</Text>}
                </VStack>
              </Box>
            )}
          </VStack>
        </WizardStepContent>
      ),
    },
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: 4, md: 0 }}>
      <VStack spacing={6} maxW="100%">
        <Card w="100%" maxW="1200px" mx="auto">
          <CardHeader pb={{ base: 4, md: 6 }}>
            <VStack spacing={2} align="center" textAlign="center">
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color={textColor} 
                fontWeight="bold"
              >
                Wizard Component Demo
              </Text>
              <Text 
                color={textColor} 
                fontSize={{ base: "sm", md: "md" }}
                maxW="600px"
              >
                Ejemplo del componente Wizard inspirado en Argon Chakra Dashboard Pro.
                Incluye múltiples pasos, validación, navegación y diferentes tipos de contenido.
              </Text>
            </VStack>
          </CardHeader>
          <CardBody px={{ base: 4, md: 6 }} py={{ base: 4, md: 6 }}>
            <Wizard
              steps={wizardSteps}
              onStepChange={handleStepChange}
              onComplete={handleComplete}
              allowStepClick={true}
              showButtons={true}
            />
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

export default WizardExample;
