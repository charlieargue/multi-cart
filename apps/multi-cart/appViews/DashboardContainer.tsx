import { Text, Box, SimpleGrid, Stack, Stat, StatLabel, StatNumber, useColorModeValue as mode, Divider, Button, Flex, HStack, Heading, Switch, Tfoot, Table, Th, TableCaption, Thead, Tr, Tbody, Td, Badge, Avatar } from '@chakra-ui/react';
import { AppLayout, CartAvatarInner } from '@multi-cart/react-shared-components';
import { Breadcrumbs } from '@multi-cart/react-ui';
import React from 'react';
import { FcDoughnutChart, FcMultipleDevices, FcPrivacy, FcTimeline } from 'react-icons/fc'
import { HiPencilAlt } from 'react-icons/hi';


interface StatCardProps {
    data: { label: string; value: string | number }
}
export const StatCard = (props: StatCardProps) => {
    const { label, value } = props.data
    return (
        <Stat px={{ base: 4, sm: 6 }} py="5" bg={mode('white', 'gray.700')} shadow="base" rounded="lg">
            <StatLabel fontWeight="medium" isTruncated color={mode('gray.500', 'gray.400')}>
                {label}
            </StatLabel>
            <StatNumber fontSize="3xl" fontWeight="medium" color={mode('gray.900', 'white')}>
                {value}
            </StatNumber>
        </Stat>
    )
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardContainerProps {
}

// TODO: componentize into Dashboard shared cmpnt
export const DashboardContainer = () => {

    const data = [
        { label: 'Total Open Carts', value: '$71,887' },
        { label: 'Avg. Closed Cart', value: '$560.87' },
        { label: 'Avg. Abandon', value: '12.87%' },
    ]

    return (
        <AppLayout>
            {/* DEMO purposes only */}


            <Box mx={8}>
                <Stack spacing={0} align={'left'} my={4}>
                    <Heading>Dashboard</Heading>
                    <Text>Recent Carts, Global Settings, Fake Stats, and lorem ipsum</Text>
                </Stack>
                <Divider />
            </Box>

            <HStack>
                {/* Settings Toggles */}
                <Box mr="auto" p={{ md: '8' }} minW="50%">
                    <Box
                        rounded={{ md: 'lg' }}
                        bg={mode('white', 'gray.700')}
                        shadow="base"
                        overflow="hidden"
                        p={6}
                    >
                        <Stack spacing="0">
                            <Text as="h3" fontWeight="bold" fontSize="lg">
                                Recent Cart Activity
                            </Text>
                            <Divider py={2} mb={2} />
                            <Box as="span" color={mode("gray.600", "white")} fontSize="sm" >

                                {/* TABLE of recent carts */}
                                <Table variant="simple" size="md">
                                    <Thead>
                                        <Tr>
                                            <Th>name</Th>
                                            <Th>status</Th>
                                            <Th>deliver to</Th>
                                            <Th isNumeric>amount</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Cart #1</Td>
                                            <Td><Badge colorScheme="blue">Processing</Badge></Td>
                                            <Td>
                                                <Flex>
                                                    <Avatar src="https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjN8fGxhZHklMjBmYWNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" />
                                                    <Box ml="3">
                                                        <Text fontWeight="bold">
                                                            Susan Smith
                                                            <Badge ml="1" colorScheme="gray">
                                                                Building 2
                                                            </Badge>
                                                        </Text>
                                                        <Text fontSize="sm">UI Engineer</Text>
                                                    </Box>
                                                </Flex>
                                            </Td>
                                            <Td isNumeric>$25.40</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Cart #2</Td>
                                            <Td><Badge colorScheme="green">Handed-Off</Badge></Td>
                                            <Td>
                                                <Flex>
                                                    <Avatar src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDN8fGd1eSUyMGZhY2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" />
                                                    <Box ml="3">
                                                        <Text fontWeight="bold">
                                                            Mike Paul
                                                            <Badge ml="1" colorScheme="gray">
                                                                Lab 203
                                                            </Badge>
                                                        </Text>
                                                        <Text fontSize="sm">UI Engineer</Text>
                                                    </Box>
                                                </Flex>
                                            </Td>
                                            <Td isNumeric>$300.48</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Cart #3</Td>
                                            <Td><Badge colorScheme="red">Rush</Badge></Td>
                                            <Td>
                                                <Flex>
                                                    <Avatar src="https://bit.ly/sage-adebayo" />
                                                    <Box ml="3">
                                                        <Text fontWeight="bold">
                                                            Segun Adebayo
                                                            <Badge ml="1" colorScheme="green">
                                                                New
                                                            </Badge>
                                                        </Text>
                                                        <Text fontSize="sm">UI Engineer</Text>
                                                    </Box>
                                                </Flex>
                                            </Td>
                                            <Td isNumeric>$12,700.44</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Cart #4</Td>
                                            <Td><Badge colorScheme="yellow">Delayed</Badge></Td>
                                            <Td>
                                                <Flex>
                                                    <Avatar src="https://images.unsplash.com/photo-1533674689012-136b487b7736?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjl8fGFmcmljYSUyMGxhZHklMjBmYWNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" />
                                                    <Box ml="3">
                                                        <Text fontWeight="bold">
                                                            Sade Akinlade
                                                            <Badge ml="1" colorScheme="green">
                                                                New
                                                            </Badge>
                                                        </Text>
                                                        <Text fontSize="sm">UI Engineer</Text>
                                                    </Box>
                                                </Flex>
                                            </Td>
                                            <Td isNumeric>$2,000.00</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>

                            </Box>
                        </Stack>
                    </Box>
                </Box>

                {/* Settings Toggles */}
                <Box mr="auto" p={{ md: '8' }} minW="50%">
                    <Box
                        rounded={{ md: 'lg' }}
                        bg={mode('white', 'gray.700')}
                        shadow="base"
                        overflow="hidden"
                        p={6}
                    >
                        <Stack spacing="0">
                            <Text as="h3" fontWeight="extrabold" fontSize="lg" align="right">
                                Global Settings
                            </Text>
                            <Box as="span" color={mode("gray.600", "white")} fontSize="sm" textAlign="right">
                                Same settings whenever you log in!
                            </Box>
                        </Stack>

                        {/* Settings */}
                        <Divider py={2} mb={2} />
                        <Flex justifyContent="space-between" align="flex-end">
                            <Stack spacing="0">
                                <Text as="h4" fontWeight="bold" fontSize="md">
                                    Default to Dark Mode
                            </Text>
                                <Box as="span" color={mode("gray.600", "white")} fontSize="sm" >
                                    No matter where you login from, we'll always default to the Dark Mode.
                            </Box>
                            </Stack>
                            <Switch colorScheme="pink" size="lg" />
                        </Flex>
                        
                        {/* Settings */}
                        <Divider py={2} mb={2} />
                        <Flex justifyContent="space-between" align="flex-end">
                            <Stack spacing="0">
                                <Text as="h4" fontWeight="bold" fontSize="md">
                                    Switch to Text Messages
                            </Text>
                                <Box as="span" color={mode("gray.600", "white")} fontSize="sm" >
                                    No more pesky emails!
                            </Box>
                            </Stack>
                            <Switch colorScheme="pink" size="lg" defaultChecked={true} />
                        </Flex>

                        {/* Settings */}
                        <Divider py={2} mb={2} />
                        <Flex justifyContent="space-between" align="flex-end">
                            <Stack spacing="0">
                                <Text as="h4" fontWeight="bold" fontSize="md">
                                    Switch to Euro
                            </Text>
                                <Box as="span" color={mode("gray.600", "white")} fontSize="sm" >
                                    Change your default currency from Dollar to Euro.
                            </Box>
                            </Stack>
                            <Switch colorScheme="pink" size="lg" />
                        </Flex>

                        {/* Settings */}
                        <Divider py={2} mb={2} />
                        <Flex justifyContent="space-between" align="flex-end">
                            <Stack spacing="0">
                                <Text as="h4" fontWeight="bold" fontSize="md">
                                    Automatic Hand-Offs
                            </Text>
                                <Box as="span" color={mode("gray.600", "white")} fontSize="sm" >
                                    Carts you hand-off are automatically accepted by recipient.
                            </Box>
                            </Stack>
                            <Switch colorScheme="pink" size="lg" />
                        </Flex>


                    </Box>
                </Box>
            </HStack>


            <Divider />

            {/* Stats */}
            <Box as="section" bg={mode('gray.50', 'gray.800')} p="10">
                <Box mr="auto" >
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
                        {data.map((stat, idx) => (
                            <StatCard key={idx} data={stat} />
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>

            <Divider />





        </AppLayout>);
};