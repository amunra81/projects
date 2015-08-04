//
//  AppDelegate.swift
//  Services
//
//  Created by Bogdan Manole on 5/31/15.
//  Copyright (c) 2015 Bogdan Manole. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        // Override point for customization after application launch.
        hs_init(nil,nil)
        //startCounter(0)
        //PlayWithServices()
        PlayWithExterns()
        let a = unsafeBitCast(getServiceList(),UnsafePointer<Service2>.self)
        let (a1,a2,a3) = (a.memory,a.successor().memory,a.successor().successor().memory)
        return true
    }
    
    func PlayWithServices()
    {
        
        // get a stable pointer of list of services
        let stablePtr = getStableServiceList()
        let noServices = countStable(stablePtr)
        
        //succed takinf the fird element
        let _3rd = takeElem(stablePtr, 1)
        
        let serviceId = stringFromHsPtr( getServiceId(_3rd) )
        //get one service
        
    }
    func PlayWithExterns()
    {
        let i = hsfun(2)
        
        //wrap
        let wrapped = wrap(i)
        let ptrFromStable:HsPtr = castStablePtrToPtr2(wrapped)
        
       // let valueFromStable = unsafeBitCast(ptrFromStable, UnsafePointer<Int>.self).memory
        
        let i2 = unwrap(wrapped)
        
        //example struct
        let struct1 = gethsstruct(i+43,i2)
        
        let x = getx(struct1)
        let ptr = unsafeBitCast(struct1, UnsafeMutablePointer<ExampleStruct>.self).memory
        freehsstruct(struct1)
        
        //array
        let xs0 = unsafeBitCast(gethslist(), UnsafeMutablePointer<ExampleStruct>.self)
        let xs1 = xs0.successor()
        let (xs0m,xs1m) = (xs0.memory,xs1.memory)
        printlist(xs1)
        
        let strLen = hsstrlen(toCString ("12345∂∂"))
        let str = stringFromHsPtr(gethsstr())
        
        let file = "file.txt"
        
        var fileContent:String?
        if let dirs : [String] = NSSearchPathForDirectoriesInDomains(NSSearchPathDirectory.DocumentDirectory, NSSearchPathDomainMask.AllDomainsMask, true) as? [String] {
            let dir = dirs[0] //documents directory
            let path = dir.stringByAppendingPathComponent(file);
            let text = "some text∆ß˙∆˜ ∆˚˙ßå∂"
            
            //writing
            text.writeToFile(path, atomically: false, encoding: NSUTF8StringEncoding, error: nil);
            
            //reading
            let text2 = String(contentsOfFile: path, encoding: NSUTF8StringEncoding, error: nil)
            
            fileContent = stringFromHsPtr(export_wcstr(toCString(path)))
        }
    }
    
    func toCString(str:String) -> UnsafeMutablePointer<Int8>
    {
        var cstr = (str as NSString).UTF8String
        return UnsafeMutablePointer<Int8>(cstr)
    }
    func stringFromHsPtr(hsPtr:HsPtr) -> String?
    {
        let ptr = unsafeBitCast(hsPtr, UnsafeMutablePointer<CChar>.self)
        return String.fromCString(ptr);
        
    }

    func applicationWillResignActive(application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(application: UIApplication) {
        // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }
}

