// @ts-nocheck
import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Circle,
  Divider,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FiCheck } from 'react-icons/fi';

const WizardStep = ({ 
  step, 
  currentStep, 
  isCompleted, 
  isActive, 
  isLast,
  onClick 
}) => {
  const activeBg = useColorModeValue('blue.500', 'blue.300');
  const completedBg = useColorModeValue('green.500', 'green.300');
  const inactiveBg = useColorModeValue('gray.200', 'gray.600');
  const activeColor = useColorModeValue('white', 'white');
  const completedTextColor = useColorModeValue('green.600', 'green.300');
  const activeTextColor = useColorModeValue('blue.600', 'blue.300');
  const inactiveColor = useColorModeValue('gray.500', 'gray.400');
  const lineColor = useColorModeValue('gray.200', 'gray.600');

  const getBgColor = () => {
    if (isCompleted) return completedBg;
    if (isActive) return activeBg;
    return inactiveBg;
  };

  const getTextColor = () => {
    if (isCompleted) return completedTextColor;
    if (isActive) return activeTextColor;
    return inactiveColor;
  };

  const getCircleTextColor = () => {
    if (isCompleted || isActive) return activeColor;
    return inactiveColor;
  };

  return (
    <Flex 
      align="center" 
      justify="center"
      flex="1" 
      direction={{ base: 'column', md: 'row' }}
      minW="0"
      mx={{ base: 1, md: 0 }}
    >
      <Flex 
        direction="column"
        align="center" 
        justify="center"
        cursor="pointer" 
        onClick={() => onClick(step.id)}
        flex="none"
        position="relative"
        w="100%"
        maxW={{ base: "140px", md: "100px" }}
        minH={{ base: "80px", md: "60px" }}
        px={{ base: 2, md: 0 }}
      >
        <Circle
          size={{ base: "32px", md: "40px" }}
          bg={getBgColor()}
          color={getCircleTextColor()}
          fontWeight="bold"
          transition="all 0.2s"
          _hover={{
            transform: 'scale(1.05)',
          }}
          mb={{ base: 2, md: 3 }}
        >
          {isCompleted ? (
            <Icon as={FiCheck} w={5} h={5} />
          ) : (
            step.id + 1
          )}
        </Circle>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight={isActive || isCompleted ? 'bold' : 'normal'}
          color={getTextColor()}
          textAlign="center"
          maxW={{ base: "140px", md: "90px" }}
          lineHeight="1.2"
          position="relative"
          left="50%"
          transform="translateX(-50%)"
          whiteSpace={{ base: "normal", md: "nowrap" }}
          overflow="visible"
          w="100%"
          px={{ base: 1, md: 0 }}
        >
          {step.title}
        </Text>
      </Flex>
      {!isLast && (
        <Divider
          flex="1"
          mx={{ base: 2, md: 4 }}
          borderColor={isCompleted ? completedBg : lineColor}
          borderWidth="2px"
          orientation={{ base: "vertical", md: "horizontal" }}
          h={{ base: "20px", md: "auto" }}
          w={{ base: "auto", md: "100%" }}
        />
      )}
    </Flex>
  );
};

const Wizard = ({ 
  steps = [], 
  onComplete,
  onStepChange,
  allowStepClick = true,
  showButtons = true,
  variant = 'default' 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const cardBg = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'navy.700');

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(nextStep);
      onStepChange?.(nextStep, steps[nextStep]);
    } else {
      // Completar wizard
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      onComplete?.(currentStep, steps[currentStep]);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep, steps[prevStep]);
    }
  };

  const handleStepClick = (stepId) => {
    if (allowStepClick && (stepId <= currentStep || completedSteps.has(stepId))) {
      setCurrentStep(stepId);
      onStepChange?.(stepId, steps[stepId]);
    }
  };

  const isStepCompleted = (stepId) => completedSteps.has(stepId);
  const isStepActive = (stepId) => stepId === currentStep;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  if (!steps.length) return null;

  return (
    <Box
      bg={cardBg}
      borderRadius={{ base: 0, md: "xl" }}
      border={{ base: "none", md: "1px solid" }}
      borderColor={borderColor}
      p={{ base: 2, md: 6 }}
      shadow="sm"
      maxW="100%"
      overflow="hidden"
      w="100%"
    >
      {/* Steps Header */}
      {/* Mobile: Solo paso actual */}
      <Box display={{ base: 'block', md: 'none' }} mb={6}>
        <VStack spacing={3} align="center">
          <Text fontSize="sm" color="gray.500" fontWeight="medium">
            Paso {currentStep + 1} de {steps.length}
          </Text>
          <WizardStep
            step={steps[currentStep]}
            currentStep={currentStep}
            isCompleted={isStepCompleted(currentStep)}
            isActive={isStepActive(currentStep)}
            isLast={false}
            onClick={handleStepClick}
          />
          {/* Barra de progreso móvil */}
          <Box w="100%" maxW="200px">
            <Box
              h="4px"
              bg={useColorModeValue('gray.200', 'gray.600')}
              borderRadius="full"
              overflow="hidden"
            >
              <Box
                h="100%"
                bg={useColorModeValue('blue.500', 'blue.300')}
                borderRadius="full"
                transition="width 0.3s ease"
                width={`${((currentStep + 1) / steps.length) * 100}%`}
              />
            </Box>
          </Box>
        </VStack>
      </Box>

      {/* Desktop: Todos los pasos */}
      <Stack 
        spacing={0} 
        mb={{ base: 6, md: 8 }}
        pb={{ base: 6, md: 4 }}
        align="center"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
        position="relative"
        minH={{ base: "80px", md: "70px" }}
        w="100%"
        display={{ base: 'none', md: 'flex' }}
        divider={
          <Divider 
            display={{ base: 'block', md: 'none' }}
            orientation="horizontal"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          />
        }
      >
        {steps.map((step, index) => (
          <WizardStep
            key={step.id}
            step={step}
            currentStep={currentStep}
            isCompleted={isStepCompleted(index)}
            isActive={isStepActive(index)}
            isLast={index === steps.length - 1}
            onClick={handleStepClick}
          />
        ))}
      </Stack>

      {/* Step Content */}
      <Box 
        minH={{ base: "250px", md: "300px" }} 
        mb={{ base: 4, md: 6 }}
        overflow="auto"
      >
        {steps[currentStep]?.content}
      </Box>

      {/* Navigation Buttons */}
      {showButtons && (
        <>
          {/* Mobile Navigation */}
          <VStack spacing={3} w="100%" display={{ base: 'flex', md: 'none' }}>
            <HStack w="100%" spacing={3}>
              <Button
                leftIcon={<ChevronLeftIcon />}
                variant="outline"
                onClick={handlePrevious}
                isDisabled={isFirstStep}
                size="lg"
                flex="1"
                fontSize="md"
                fontWeight="semibold"
                borderRadius="xl"
                _hover={{
                  bg: useColorModeValue('gray.50', 'gray.700'),
                  transform: 'translateY(-1px)',
                }}
                _disabled={{
                  opacity: 0.4,
                  cursor: 'not-allowed',
                }}
                transition="all 0.2s"
              >
                Anterior
              </Button>
              
              <Button
                rightIcon={<ChevronRightIcon />}
                colorScheme="blue"
                onClick={handleNext}
                size="lg"
                flex="1"
                fontSize="md"
                fontWeight="semibold"
                borderRadius="xl"
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                {isLastStep ? 'Finalizar' : 'Siguiente'}
              </Button>
            </HStack>
          </VStack>

          {/* Desktop Navigation */}
          <Flex 
            justify="space-between" 
            align="center"
            direction="row"
            w="100%"
            display={{ base: 'none', md: 'flex' }}
          >
            <Button
              leftIcon={<ChevronLeftIcon />}
              variant="ghost"
              onClick={handlePrevious}
              isDisabled={isFirstStep}
              size="lg"
              px={8}
              py={4}
              minW="120px"
              fontSize="lg"
              fontWeight="semibold"
              _hover={{
                bg: useColorModeValue('gray.100', 'gray.600'),
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
            >
              Anterior
            </Button>

            <Text 
              fontSize="sm" 
              color="gray.500"
            >
              Paso {currentStep + 1} de {steps.length}
            </Text>

            <Button
              rightIcon={<ChevronRightIcon />}
              colorScheme="blue"
              onClick={handleNext}
              size="lg"
              px={8}
              py={4}
              minW="120px"
              fontSize="lg"
              fontWeight="semibold"
              _hover={{
                transform: 'translateY(-1px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              {isLastStep ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Wizard;
