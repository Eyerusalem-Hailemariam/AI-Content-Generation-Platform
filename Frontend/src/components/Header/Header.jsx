import React, { useState } from 'react';
import { Button, Input, Box, Heading, Text, Flex, Spacer } from '@chakra-ui/react';

function Header() {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', search);
        // Implement your search or filter logic here
    };

    const handleLogin = () => {
        console.log('Navigate to login page');
        // Implement navigation logic, e.g. React Router navigate('/login')
    };

    const handleSignup = () => {
        console.log('Navigate to signup page');
        // Implement navigation logic, e.g. React Router navigate('/signup')
    };

    return (
        <Box
            bg="blue.600"
            color="white"
            py={6}
            px={4}
            boxShadow="md"
        >
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'center', md: 'center' }}
                justify="space-between"
                mb={4}
            >
                <Box textAlign={{ base: 'center', md: 'left' }}>
                    <Heading as="h1" size="lg" mb={{ base: 2, md: 0 }}>
                        My Application
                    </Heading>
                    <Text fontSize="md">
                        Welcome to your dashboard
                    </Text>
                </Box>

                <Flex gap={2} mt={{ base: 4, md: 0 }}>
                    <Button colorScheme="teal" variant="outline" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button colorScheme="teal" onClick={handleSignup}>
                        Signup
                    </Button>
                </Flex>
            </Flex>

            <Flex
                justify="center"
                align="center"
                gap={2}
                maxW="md"
                mx="auto"
            >
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    bg="white"
                    color="black"
                />
                <Button colorScheme="teal" onClick={handleSearch}>
                    Search
                </Button>
            </Flex>
        </Box>
    );
}

export default Header;
