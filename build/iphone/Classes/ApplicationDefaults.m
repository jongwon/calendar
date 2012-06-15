/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"phYf8Z3MtrwV9y5IV6u7hQQGm6lyPmp6"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"EcigfG8ifjZirSqrvz18YqlmaJGDuQmG"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"jHRjNMhu6EoshLTODYs9MximABFdGSrT"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"XP5UayuoovgzowPfws4N6huwSQjfB1wN"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"vMBCJLwJ2PDqaIC5i7xv5n9xVKVeXpSB"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"XacTPvsDZEn1FTZQHuDXpFAOSQZDquDA"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
