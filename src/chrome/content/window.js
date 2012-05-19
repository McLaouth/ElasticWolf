var ew_window = {
    tabs: [ { tab: "ew.tabs.instance",      views: [ { id: "ew.instances.view", view: ew_InstancesTreeView }], },
            { tab: "ew.tabs.image",         views: [ { id: "ew.images.view", view: ew_AMIsTreeView } ], },
            { tab: "ew.tabs.auth",          views: [ { id: "ew.keypairs.view", view: ew_KeypairTreeView },
                                                     { id: "ew.accesskeys.view", view: ew_AccessKeyTreeView },
                                                     { id: "ew.certs.view", view: ew_CertTreeView } ], },
                                                     { tab: "ew.tabs.securitygroup", views: [ { id: "ew.securitygroups.view", view: ew_SecurityGroupsTreeView },
                                                     { id: "ew.permissions.view", view: ew_PermissionsTreeView }], },
            { tab: "ew.tabs.eip",           views: [ { id: "ew.eip.view", view: ew_ElasticIPTreeView }], },
            { tab: "ew.tabs.volume",        views: [ { id: "ew.volumes.view", view: ew_VolumeTreeView },
                                                     { id: "ew.snapshots.view", view: ew_SnapshotTreeView }] },
            { tab: "ew.tabs.loadbalancer",  views: [ { id: "ew.loadbalancer.view", view: ew_LoadbalancerTreeView },
                                                     { id: "ew.instancehealth.view", view: ew_InstanceHealthTreeView }], },
            { tab: "ew.tabs.bundletask",    views: [ { id: "ew.bundleTasks.view", view: ew_BundleTasksTreeView } ], },
            { tab: "ew.tabs.lease",         views: [ { id: "ew.offerings.view", view: ew_LeaseOfferingsTreeView },
                                                     { id: "ew.rsvdInst.view", view: ew_ReservedInstancesTreeView } ], },
            { tab: "ew.tabs.vpc",           views: [ { id: "ew.vpcs.view", view: ew_VpcTreeView },
                                                     { id: "ew.subnets.view", view: ew_SubnetTreeView },
                                                     { id: "ew.dhcpoptions.view", view: ew_DhcpoptsTreeView } ], },
            { tab: "ew.tabs.routing",       views: [ { id: "ew.routetables.view", view: ew_RouteTablesTreeView },
                                                     { id: "ew.routes.view", view: ew_RoutesTreeView },
                                                     { id: "ew.route.associations.view", view: ew_RouteAssociationsTreeView },
                                                     { id: "ew.internetgateways.view", view : ew_InternetGatewayTreeView } ], },
            { tab: "ew.tabs.acl",           views: [ { id: "ew.acls.view", view: ew_NetworkAclsTreeView } ,
                                                     { id: "ew.acls.associations.view", view: ew_NetworkAclAssociationsTreeView },
                                                     { id: "ew.acls.rules.view", view: ew_NetworkAclRulesTreeView }], },
            { tab: "ew.tabs.eni",           views: [ { id: "ew.enis.view", view: ew_NetworkInterfacesTreeView },
                                                     { id: "ew.enis.attachments.view", view: ew_NetworkInterfaceAttachmentsTreeView } ], },
            { tab: "ew.tabs.vpn",           views: [ { id: "ew.vpngateways.view", view: ew_VpnGatewayTreeView },
                                                     { id: "ew.vpnconnections.view", view: ew_VpnConnectionTreeView },
                                                     { id: "ew.customergateways.view", view: ew_CustomerGatewayTreeView },
                                                     { id: "ew.vpnattachments.view", view: ew_VpnAttachmentTreeView } ], },
            { tab: "ew.tabs.availzone",     views: [ { id: "ew.azones.view", view: ew_AvailZoneTreeView }], },
            { tab: "ew.tabs.s3",            views: [ { id: "ew.s3.view", view: ew_S3BucketsTreeView }], },
    ],

};