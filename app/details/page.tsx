'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { welcomePopupAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Home, ArrowLeft } from 'lucide-react';

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  cellNumber: string;
}

export default function DetailsPage() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get email from URL search params
        const email = searchParams.get('email');
        
        if (!email) {
          setError('Email parameter is required');
          setLoading(false);
          return;
        }

        const details = await welcomePopupAPI.getUserDetails(email);
        setUserDetails(details);
      } catch (err: any) {
        console.error('Error fetching user details:', err);
        setError(err.response?.data?.message || 'Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-black mx-auto mb-3 md:mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6">
            <User className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
          </div>
          
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
            User Not Found
          </h1>
          
          <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
            {error}
          </p>
          
          <Link href="/">
            <Button className="bg-black hover:bg-gray-800 text-white px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Home className="h-3 w-3 md:h-4 md:w-4 mr-2" aria-hidden="true" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 md:mb-8">          
          <div className="text-center mb-6 md:mb-8">
        
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              User Details
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Welcome to Harmony4All
            </p>
          </div>
        </div>

        {userDetails && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-black text-white rounded-t-lg p-4 md:p-6">
              <CardTitle className="flex items-center text-sm md:text-base">
                <User className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {userDetails.firstName} {userDetails.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {userDetails.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">Phone Number</p>
                    <p className="font-semibold text-gray-900 text-sm md:text-base">
                      {userDetails.cellNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                    Thank you for joining our mission!
                  </p>
                  <Link href="/">
                    <Button className="bg-black hover:bg-gray-800 text-white w-full text-sm md:text-base">
                      <Home className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      Visit Our Website
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
