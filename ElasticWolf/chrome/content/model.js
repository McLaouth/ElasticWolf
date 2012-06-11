function Certificate(id, user, body)
{
    this.id = id
    this.userName = user
    this.body = body
    this.toString = function() {
        return this.id;
    }
}

function KeyPair(name, fingerprint)
{
    this.name = name;
    this.fingerprint = fingerprint;
    this.toString = function() {
        return this.name;
    }
}

function AccessKey(id, status, user, secret, isCurrent)
{
    this.id = id;
    this.status = status;
    this.userName = user
    this.secret = secret || "";
    this.isCurrent = isCurrent
    this.toString = function() {
        return this.id + (this.isCurrent ? ew_model.separator + "Current" : "");
    }
}

function Credential(name, accessKey, secretKey, endPoint)
{
    this.name = name;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.endPoint = endPoint || "";

    this.toString = function() {
        return this.accessKey + ";;" + this.secretKey + ";;" + this.endPoint;
    }
}

function User(id, name, path, arn)
{
    this.id = id
    this.name = name;
    this.path = path;
    this.arn = arn;
    this.groups = null;
    this.policies = null;
    this.keys = null;
    this.devices = null;
    this.certs = null;

    this.toString = function() {
        return this.name + (this.groups && this.groups.length ? ew_model.separator + this.groups : "");
    }
}

function UserGroup(id, name, path, arn)
{
    this.id = id
    this.name = name
    this.path = path
    this.arn = arn
    this.users = null;
    this.policies = null;

    this.toString = function() {
        return this.name;
    }
}

function MFADevice(serial, date, user, arn)
{
    this.id = serial
    this.date = date
    this.userName = user
    this.arn = arn

    this.toString = function() {
        return this.id + (this.userName ? ew_model.separator + this.userName : "");
    }
}

function S3Bucket(name, mtime, owner)
{
    this.name = name
    this.mtime = mtime
    this.owner = owner
    this.region = ""
    this.acls = null
    this.keys = []
    this.toString = function() {
        return this.name;
    }
}

function S3BucketAcl(id, type, name, permission)
{
    this.id = id
    this.type = type
    this.name = name
    this.permission = permission
    this.toString = function() {
       return (this.name ? this.name : this.id ? this.id : "ALL") + "=" + this.permission;
    }
}

function S3BucketKey(bucket, name, type, size, mtime, owner, etag)
{
    this.bucket = bucket
    this.name = name
    this.type = type
    this.size = size
    this.mtime = mtime
    this.etag = etag
    this.owner = owner
    this.toString = function() {
        return this.bucket + "/" + this.name;
    }
}

function Tag(key, value)
{
    this.key = key || "";
    this.value = value || "";
    this.toString = function() {
        return this.key + ":" + (this.value.match(/[,:]+/) ? '"' + this.value + '"' : this.value);
    }
}

function Group(id, name)
{
    this.id = id
    this.name = name
    this.toString = function() {
        return this.name + ew_model.separator + this.id;
    }
}

function ProductCode(code, type)
{
    this.productCode = code
    this.type = type
    this.toString = function() {
        return this.productCode + ew_model.separator + this.type;
    }
}

function NetworkInterface(id, status, descr, subnetId, vpcId, availabilityZone, macAddress, privateIpAddress, sourceDestCheck, groups, attachment, association, tags)
{
    this.id = id
    this.status = status
    this.descr = descr || "";
    this.subnetId = subnetId
    this.vpcId = vpcId
    this.availabilityZone = availabilityZone
    this.macAddress = macAddress
    this.privateIpAddress = privateIpAddress
    this.sourceDestCheck = sourceDestCheck
    this.groups = groups || [];
    this.attachment = attachment
    this.association = association
    this.tags = tags
    ew_model.processTags(this, "descr")

    this.toString = function() {
        return this.privateIpAddress + ew_model.separator + this.status + ew_model.separator + this.id + ew_model.separator +  this.descr +
               " (" + ew_model.modelValue("subnetId", this.subnetId) + ")";
    }
}

function NetworkInterfaceAttachment(id, instanceId, instanceOwnerId, deviceIndex, status, attachTime, deleteOnTermination)
{
    this.id = id;
    this.instanceId = instanceId;
    this.instanceOwnerId = instanceOwnerId;
    this.deviceIndex = deviceIndex;
    this.status = status;
    this.attachTime = attachTime;
    this.deleteOnTermination = deleteOnTermination;

    this.toString = function() {
        return this.deviceIndex + ew_model.separator + this.status + ew_model.separator + this.id +
               (this.instanceId ? " (" + ew_model.modelValue("instanceId", this.instanceId) + ")" : "");
    }
}

function NetworkInterfaceAssociation(id, publicIp, ipOwnerId, instanceId, attachmentId)
{
    this.id = id;
    this.publicIp = publicIp
    this.ipOwnerId = ipOwnerId
    this.instanceId = instanceId
    this.attachmentId = attachmentId
    this.toString = function() {
        return this.publicIp + ew_model.separator + this.id +
               (this.instanceId ? " (" + ew_model.modelValue("instanceId", this.instanceId) + ")" : "");
    }
}

function NetworkAclAssociation(id, acl, subnet)
{
    this.id = id
    this.aclId = acl
    this.subnetId = subnet
    this.toString = function() {
        return this.id + ew_model.separator + ew_model.modelValue("subnetId", this.subnetId);
    }
}

function NetworkAclEntry(num, proto, action, egress, cidr, icmp, ports)
{
    this.num = num
    this.proto = proto
    this.action = action
    this.egress = egress
    this.cidr = cidr
    this.icmp = icmp ? icmp : []
    this.ports = ports ? ports : []
    this.toString = function() {
        return this.num + ew_model.separator + this.proto + ew_model.separator + this.action + ew_model.separator + (this.egress ? "Egress" + ew_model.separator : "") + this.cidr;
    }
}

function NetworkAcl(id, vpcId, dflt, rules, assocs)
{
    this.id = id
    this.vpcId = vpcId
    this.dflt = dflt
    this.rules = rules
    this.associations = assocs
    this.toString = function() {
        return this.id + ew_model.separator + (dflt ? "default" : "") + " (" + ew_model.modelValue("vpcId", this.vpcId) + ")";
    }
}

function Endpoint(name, url)
{
    if (!name || name == "") {
        this.name = url.replace(/(https?:\/\/|ec2|amazonaws|com|\.)/g, "")
    } else {
        this.name = name;
    }
    this.url = url;

    this.toString = function() {
        return this.name;
    }
}

function AMI(id, location, state, owner, isPublic, arch, platform, aki, ari, rootDeviceType, ownerAlias, name, description, snapshotId, tags)
{
    this.id = id;
    this.location = location;
    this.state = state;
    this.owner = owner;
    this.isPublic = isPublic;
    this.arch = arch;
    this.platform = platform;
    this.tags = tags;
    this.aki = aki;
    this.ari = ari;
    this.rootDeviceType = rootDeviceType;
    this.ownerAlias = ownerAlias;
    this.name = name;
    this.description = description;
    this.snapshotId = snapshotId;
    ew_model.processTags(this)

    this.toString = function() {
        return this.id;
    }
}

function Snapshot(id, volumeId, status, startTime, progress, volumeSize, description, owner, ownerAlias, tags)
{
    this.id = id;
    this.volumeId = volumeId;
    this.status = status;
    this.startTime = startTime.strftime('%Y-%m-%d %H:%M:%S');
    this.progress = progress;
    this.description = description;
    this.volumeSize = volumeSize;
    this.owner = owner;
    this.ownerAlias = ownerAlias;
    this.tags = tags;
    ew_model.processTags(this);

    this.toString = function() {
        return this.description + ew_model.separator + this.id + ew_model.separator + this.status + "/" + this.progress;
    }
}

function Volume(id, size, snapshotId, zone, status, createTime, instanceId, device, attachStatus, attachTime, tags)
{
    this.id = id;
    this.size = size;
    this.snapshotId = snapshotId;
    this.availabilityZone = zone;
    this.status = status;
    this.createTime = createTime.strftime('%Y-%m-%d %H:%M:%S');
    this.instanceId = instanceId;
    this.device = device;
    this.attachStatus = attachStatus;
    if (attachStatus != "") {
        this.attachTime = attachTime.strftime('%Y-%m-%d %H:%M:%S');
    }
    this.tags = tags;
    ew_model.processTags(this);

    this.toString = function() {
        return (this.name ? this.name + ew_model.separator : "") + this.id + ew_model.separator + this.device + ew_model.separator + this.status +
               (this.instanceId ? " (" + ew_model.modelValue("instanceId", this.instanceId) + ")" : "");
    }
}

function VolumeStatusEvent(volumeId, availabilityZone, eventId, eventType, description, startTime, endTime)
{
    this.volumeId = volumeId;
    this.availabilityZone = availabilityZone;
    this.eventId = eventId;
    this.eventType = eventType;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;

    this.toString = function() {
        return this.volumeId + ew_model.separator + this.description;
    }
}

function InstanceVolumeAttachment(volumeId, deviceName, status, attachTime, deleteOnTermination)
{
    this.volumeId = volumeId;
    this.deviceName = deviceName;
    this.status = status;
    this.attachTime = attachTime;
    this.deleteOnTermination = deleteOnTermination;

    this.toString = function() {
        return this.deviceName + ew_model.separator + this.status + ew_model.separator + this.volumeId + ew_model.separator + (this.deleteOnTermination ? "DeleteOnTermination" : "Keep");
    }
}

function InstanceNetworkInterface(id, status, descr, subnetId, vpcId, ownerId, privateIp, publicIp, dnsName, srcDstCheck)
{
    this.id = id
    this.status = status
    this.descr = descr || "";
    this.subnetId = subnetId
    this.vpcId = vpcId
    this.ownerId = ownerId
    this.privateIp = privateIp
    this.publicIp = publicIp
    this.sourceDestCheck = srcDstCheck
    this.dnsName = dnsName

    this.toString = function() {
        return this.privateIp + ew_model.separator + this.publicIp + ew_model.separator + this.status + ew_model.separator + this.id + ew_model.separator +  this.descr +
               " (" + ew_model.modelValue("subnetId", this.subnetId) + ")";
    }
}

function Instance(reservationId, ownerId, requesterId, instanceId, imageId, state, productCodes, groups, dnsName, privateDnsName, privateIpAddress, vpcId, subnetId, keyName, reason,
                  amiLaunchIdx, instanceType, launchTime, availabilityZone, tenancy, monitoringStatus, stateReason, platform, kernelId, ramdiskId, rootDeviceType, rootDeviceName,
                  virtualizationType, hypervisor, ipAddress, sourceDestCheck, architecture, instanceLifecycle, clientToken, volumes, enis, tags)
{
    this.id = instanceId;
    this.reservationId = reservationId;
    this.ownerId = ownerId;
    this.requesterId = requesterId;
    this.publicIpAddress = '';
    this.publicDnsName = '';
    this.elasticIp = '';
    this.imageId = imageId;
    this.state = state;
    this.productCodes = productCodes;
    this.groups = uniqueList(groups, 'id');
    this.dnsName = dnsName;
    this.privateDnsName = privateDnsName;
    this.privateIpAddress = privateIpAddress;
    this.vpcId = vpcId;
    this.subnetId = subnetId;
    this.keyName = keyName;
    this.reason = reason;
    this.amiLaunchIdx = amiLaunchIdx;
    this.instanceType = instanceType;
    this.launchTime = launchTime;
    this.availabilityZone = availabilityZone;
    this.tenancy = tenancy;
    this.monitoringStatus = monitoringStatus;
    this.stateReason = stateReason;
    this.platform = platform;
    this.kernelId = kernelId;
    this.ramdiskId = ramdiskId;
    this.rootDeviceType = rootDeviceType;
    this.rootDeviceName = rootDeviceName;
    this.virtualizationType = virtualizationType;
    this.hypervisor = hypervisor;
    this.ipAddress = ipAddress;
    this.sourceDestCheck = sourceDestCheck;
    this.architecture = architecture;
    this.instanceLifecycle = instanceLifecycle;
    this.clientToken = clientToken;
    this.volumes = volumes;
    this.enis = enis;
    this.tags = tags;
    this.name = '';
    ew_model.processTags(this);

    this.toString = function() {
        return (this.name ? this.name + ew_model.separator : "") + this.id + ew_model.separator + this.state;
    }

    this.getPublicIp = function() {
        if (this.publicDnsName) {
            var parts = this.publicDnsName.split('-');
            return parts[1] + "." + parts[2] + "." + parts[3] + "." + parseInt(parts[4]);
        }
        return "";
    }
}

function InstanceStatusEvent(instanceId, availabilityZone, code, description, startTime, endTime)
{
    this.instanceId = instanceId;
    this.availabilityZone = availabilityZone;
    this.code = code;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;

    this.toString = function() {
        return this.instanceId + ew_model.separator + this.description;
    }
}

function SecurityGroup(id, ownerId, name, description, vpcId, permissions, tags)
{
    this.id = id
    this.ownerId = ownerId;
    this.name = name;
    this.description = description;
    this.vpcId = vpcId;
    this.permissions = permissions;
    this.tags = tags
    ew_model.processTags(this)
    this.toString = function() {
        return this.name + ew_model.separator + this.id + (this.vpcId ? " (" + ew_model.modelValue("vpcId", this.vpcId) + ")" : "");
    }
}

function Permission(type, protocol, fromPort, toPort, srcGroup, cidrIp)
{
    this.type = type
    this.protocol = protocol;
    this.fromPort = fromPort;
    this.toPort = toPort;
    this.srcGroup = srcGroup;
    if (srcGroup) {
        this.srcGroup.toString = function() {
            return srcGroup.id + ew_model.separator + srcGroup.name;
        }
    }
    this.cidrIp = cidrIp;
    this.toString = function() {
        return this.type + ew_model.separator + this.protocol + ew_model.separator + this.fromPort + ":" + this.toPort + ew_model.separator + (this.cidrIp ? this.cidrIp : this.srcGroup ? this.srcGroup.toString() : "");
    }
}

function Route(tableId, cidr, state, gatewayId, eniId, instanceId, instanceOwner)
{
    this.tableId = tableId
    this.cidr = cidr
    this.gatewayId = gatewayId
    this.instanceId = instanceId
    this.instanceOwnerId = instanceOwner
    this.networkInterfaceId = eniId
    this.state = state
    this.toString = function() {
        return this.cidr + ew_model.separator + ew_model.modelValue("gatewayId", this.gatewayId);
    }
}

function RouteAssociation(id, tableId, subnetId)
{
    this.id = id
    this.tableId = tableId || ""
    this.subnetId = subnetId || ""
    this.toString = function() {
        return this.id;
    }
}

function RouteTable(id, vpcId, routes, associations, tags)
{
    this.id = id
    this.vpcId = vpcId
    this.routes = routes
    this.associations = associations
    this.tags = tags
    ew_model.processTags(this);

    this.toString = function() {
        var str = this.id
        if (this.routes && this.routes.length > 0) {
            str += " ("
            for (var i in this.routes) {
                str += (i > 0 ? "," : "") + this.routes[i].cidr;
            }
            str += ")"
        }
        return str;
    }
}

function AvailabilityZone(name, state)
{
    this.name = name;
    this.state = state;

    this.toString = function() {
        return this.name + ew_model.separator + this.state;
    }
}

function EIP(publicIp, instanceid, allocId, assocId, domain, tags)
{
    this.publicIp = publicIp;
    this.instanceId = instanceid;
    this.allocationId = allocId || "";
    this.associationId = assocId || "";
    this.domain = domain || "";
    this.tags = tags;
    ew_model.processTags(this)

    this.toString = function() {
        return this.publicIp + (this.instanceId ?  " (" + ew_model.modelValue('instanceId', this.instanceId) + ")" : "");
    }
}

function BundleTask(id, instanceId, state, startTime, updateTime, s3bucket, s3prefix, errorMsg)
{
    this.id = id;
    this.instanceId = instanceId;
    this.state = state;
    this.startTime = startTime.strftime('%Y-%m-%d %H:%M:%S');
    this.updateTime = updateTime.strftime('%Y-%m-%d %H:%M:%S');
    this.s3bucket = s3bucket;
    this.s3prefix = s3prefix;
    this.errorMsg = errorMsg;

    this.toString = function() {
        return this.id
    }
}

function LeaseOffering(id, type, az, duration, fPrice, uPrice, desc, offering, tenancy)
{
    this.id = id;
    this.instanceType = type;
    this.azone = az;
    this.duration = duration;
    this.fixedPrice = fPrice;
    this.usagePrice = uPrice;
    this.description = desc;
    this.offering = offering;
    this.tenancy = tenancy;

    this.toString = function() {
        return this.id
    }
}

function ReservedInstance(id, type, az, start, duration, fPrice, uPrice, count, desc, state, tenancy)
{
    this.id = id;
    this.instanceType = type;
    this.azone = az;
    this.startTime = start;
    this.start = start.strftime('%Y-%m-%d %H:%M:%S');
    this.duration = duration;
    this.fixedPrice = fPrice;
    this.usagePrice = uPrice;
    this.count = count;
    this.description = desc;
    this.state = state;
    this.tenancy = tenancy

    this.toString = function() {
        return this.id
    }
}

function Vpc(id, cidr, state, dhcpOptionsId, tags)
{
    this.id = id;
    this.cidr = cidr;
    this.state = state;
    this.dhcpOptionsId = dhcpOptionsId;
    this.tags = tags;
    ew_model.processTags(this)

    this.toString = function() {
        return this.cidr + ew_model.separator + this.id;
    }
}

function Subnet(id, vpcId, cidr, state, availableIp, availabilityZone, tags)
{
    this.id = id;
    this.vpcId = vpcId;
    this.cidr = cidr;
    this.state = state;
    this.availableIp = availableIp;
    this.availabilityZone = availabilityZone;
    this.tags = tags;
    ew_model.processTags(this)

    this.toString = function() {
        return this.cidr + ew_model.separator + this.id + ew_model.separator + this.availableIp + ew_model.separator + this.availabilityZone;
    }
}

function DhcpOptions(id, options, tags)
{
    this.id = id;
    this.options = options;
    this.tags = tags;
    ew_model.processTags(this)

    this.toString = function() {
        return this.options + ew_model.separator + this.id;
    }
}

function VpnConnection(id, vgwId, cgwId, type, state, config, tags)
{
    this.id = id;
    this.vgwId = vgwId;
    this.cgwId = cgwId;
    this.type = type;
    this.state = state;
    this.config = config;
    this.tags = tags;
    ew_model.processTags(this)

    this.toString = function() {
        return this.id + ew_model.separator + this.state + " (" + ew_model.modelValue("vgwId", this.vgwId) + ")";
    }
}

function InternetGateway(id, vpcId, tags)
{
    this.id = id
    this.vpcId = vpcId;
    this.tags = tags
    ew_model.processTags(this)

    this.toString = function() {
        return this.id + ew_model.separator + ew_model.modelValue("vpcId", this.vpcId);
    }
}

function VpnGateway(id, availabilityZone, state, type, attachments, tags)
{
    this.id = id;
    this.availabilityZone = availabilityZone;
    this.state = state;
    this.type = type;
    this.attachments = attachments || [];
    this.tags = tags;
    ew_model.processTags(this)

    this.toString = function() {
        var text = this.id + ew_model.separator + this.state
        for (var i in this.attachments) {
            text += ", " + this.attachments[i].toString();
        }
        return text;
    }
}

function VpnGatewayAttachment(vpcId, vgwId, state)
{
    this.vpcId = vpcId;
    this.vgwId = vgwId;
    this.state = state;
    this.toString = function() {
        return this.state + ew_model.separator + ew_model.modelValue("vpcId", this.vpcId);
    }
}

function CustomerGateway(id, ipAddress, bgpAsn, state, type, tags)
{
    this.id = id;
    this.ipAddress = ipAddress;
    this.bgpAsn = bgpAsn;
    this.state = state;
    this.type = type;
    this.tags = tags;
    ew_model.processTags(this)

    this.toString = function() {
        return this.ipAddress + ew_model.separator + this.bgpAsn;
    }
}

function LoadBalancer(LoadBalancerName, CreatedTime, DNSName, Instances, Protocol, LoadBalancerPort, InstancePort, Interval, Timeout, HealthyThreshold, UnhealthyThreshold, Target, availabilityZones, CookieName, APolicyName, CookieExpirationPeriod, CPolicyName, vpcId, subnets, groups)
{
    this.LoadBalancerName = LoadBalancerName;
    this.CreatedTime = CreatedTime;
    this.DNSName = DNSName;
    this.Instances = Instances;
    this.Protocol = Protocol;
    this.LoadBalancerPort = LoadBalancerPort;
    this.InstancePort = InstancePort;
    this.Interval = Interval;
    this.Timeout = Timeout;
    this.HealthyThreshold = HealthyThreshold;
    this.UnhealthyThreshold = UnhealthyThreshold;
    this.Target = Target;
    this.zones = availabilityZones;
    this.CookieName = CookieName;
    this.APolicyName = APolicyName;
    this.CookieExpirationPeriod = CookieExpirationPeriod;
    this.CPolicyName = CPolicyName;
    this.vpcId = vpcId
    this.subnets = subnets
    this.groups = groups

    this.toString = function() {
        return this.LoadBalancerName;
    }
}

function InstanceHealth(Description, State, InstanceId, ReasonCode)
{
    this.Description = Description;
    this.State = State;
    this.InstanceId = InstanceId;
    this.ReasonCode = ReasonCode;
    this.toString = function() {
        return this.Description + ew_model.separator + this.State + ew_model.separator + ew_model("instanceId", this.InstanceId);
    }
}

var ew_model = {
    components : new Array(),
    componentInterests : new Object(),

    separator: " | ",
    volumes : null,
    images : null,
    snapshots : null,
    instances : null,
    keypairs : null,
    availabilityZones : null,
    securityGroups : null,
    addresses : null,
    bundleTasks : null,
    offerings : null,
    reservedInstances : null,
    loadBalancers : null,
    subnets : null,
    vpcs : null,
    dhcpOptions : null,
    vpnConnections : null,
    vpnGateways : null,
    customerGateways : null,
    internetGateways : null,
    routeTables: null,
    networkAcls: null,
    networkInterfaces: null,
    s3Buckets: null,
    regions: null,
    users: null,
    groups: null,
    vmfa: null,

    invalidate : function()
    {
        // reset all lists, these will notify their associated views
        this.updateVMFADevices(null);
        this.updateUsers(null);
        this.updateGroups(null);
        this.updateImages(null);
        this.updateInstances(null);
        this.updateKeypairs(null);
        this.updateAccessKeys(null);
        this.updateCerts(null);
        this.updateSecurityGroups(null);
        this.updateAvailabilityZones(null);
        this.updateAddresses(null);
        this.updateVolumes(null);
        this.updateSnapshots(null);
        this.updateBundleTasks(null);
        this.updateLeaseOfferings(null);
        this.updateReservedInstances(null);
        this.updateLoadBalancers(null);
        this.updateVpcs(null);
        this.updateSubnets(null);
        this.updateDhcpOptions(null);
        this.updateVpnConnections(null);
        this.updateVpnGateways(null);
        this.updateCustomerGateways(null);
        this.updateInternetGateways(null);
        this.updateRouteTables(null);
        this.updateNetworkAcls(null);
        this.updateNetworkInterfaces(null);
        this.updateS3Buckets(null);
    },

    getModel : function(name)
    {
        switch (name) {
        case "vmfa":
            return this.vmfa;
        case "regions":
            return this.regions;
        case "volumes":
            return this.volumes;
        case "images":
            return this.images;
        case "snapshots":
            return this.snapshots;
        case "instances":
            return this.instances;
        case "keypairs":
            return this.keypairs;
        case "availabilityZones":
            return this.availabilityZones;
        case "securityGroups":
            return this.securityGroups;
        case "addresses":
            return this.addresses;
        case "bundleTasks":
            return this.bundleTasks;
        case "offerings":
            return this.offerings;
        case "reservedInstances":
            return this.reservedInstances;
        case "loadBalancers":
            return this.loadBalancers;
        case "subnets":
            return this.subnets;
        case "vpcs":
            return this.vpcs;
        case "dhcpOptions":
            return this.dhcpOptions;
        case "vpnConnections":
            return this.vpnConnections;
        case "vpnGateways":
            return this.vpnGateways;
        case "customerGateways":
            return this.customerGateways;
        case "internetGateways":
            return this.internetGateways;
        case "routeTables":
            return this.routeTables;
        case "networkAcls":
            return this.networkAcls;
        case "networkInterfaces":
            return this.networkInterfaces;
        case "s3Buckets":
            return this.s3Buckets;
        case "users":
            return this.users;
        case "groups":
            return this.groups;
        }
        return []
    },

    refreshModel : function(name)
    {
        switch (name) {
        case "vmfa":
            ew_session.controller.listVirtualMFADevices();
            break;
        case "regions":
            ew_session.controller.describeRegions();
            break;
        case "instanceStatus":
            ew_session.controller.describeInstanceStatus();
            break;
        case "volumeStatus":
            ew_session.controller.describeVolumeStatus();
            break;
        case "volumes":
            ew_session.controller.describeVolumes();
            break;
        case "images":
            ew_session.controller.describeImages();
            break;
        case "snapshots":
            ew_session.controller.describeSnapshots();
            break;
        case "instances":
            ew_session.controller.describeInstances();
            break;
        case "keypairs":
            ew_session.controller.describeKeypairs();
            break;
        case "availabilityZones":
            ew_session.controller.describeAvailabilityZones();
            break;
        case "securityGroups":
            ew_session.controller.describeSecurityGroups();
            break;
        case "addresses":
            ew_session.controller.describeAddresses();
            break;
        case "bundleTasks":
            ew_session.controller.describeBundleTasks();
            break;
        case "offerings":
            ew_session.controller.describeLeaseOfferings();
            break;
        case "reservedInstances":
            ew_session.controller.describeReservedInstances();
            break;
        case "loadBalancers":
            ew_session.controller.describeLoadBalancers();
            break;
        case "subnets":
            ew_session.controller.describeSubnets();
            break;
        case "vpcs":
            ew_session.controller.describeVpcs();
            break;
        case "dhcpOptions":
            ew_session.controller.describeDhcpOptions();
            break;
        case "vpnConnections":
            ew_session.controller.describeVpnConnections();
            break;
        case "vpnGateways":
            ew_session.controller.describeVpnGateways();
            break;
        case "customerGateways":
            ew_session.controller.describeCustomerGateways();
            break;
        case "internetGateways":
            ew_session.controller.describeInternetGateways();
            break;
        case "routeTables":
            ew_session.controller.describeRouteTables();
            break;
        case "networkAcls":
            ew_session.controller.describeNetworkAcls();
            break;
        case "networkInterfaces":
            ew_session.controller.describeNetworkInterfaces();
            break;
        case "s3Buckets":
            ew_session.controller.listS3Buckets();
            break;
        case "users":
            ew_session.controller.listUsers();
            break;
        case "groups":
            ew_session.controller.listGroups();
            break;
        }
        return []
    },

    // Update field of an object in the model
    updateModel: function(model, id, field, value)
    {
        if (!model || !id || !field) return null;
        var obj = this.findObject(this.getModel(model), id);
        if (obj) {
            obj[field] = value;
        }
        return obj;
    },

    findModel: function(model, id)
    {
        return this.findObject(this.getModel(model), id);
    },

    // Common replacement for cells by name, builds human readable value
    modelValue: function(name, value)
    {
        var idMap = { vpcId: this.vpcs,
                      subnetId: this.subnets,
                      instanceId: this.instances,
                      tableId: this.routeTables,
                      gatewayId: this.internetGateways,
                      cgwId: this.customerGateways,
                      vgwId: this.vpnGateways,
                      igwId: this.internetGateways,
                      dhcpOptionsId: this.dhcpOptions,
                      networkInterfaceId: this.networkInterfaces,
                      groups: this.securityGroups,
                      subnets: this.subnets };

        var list = idMap[name];
        if (list) {
            if (value instanceof Array) {
                var rc = [];
                for (var i in value) {
                    if (typeof value[i] == "object") {
                        rc.push(value[i].toString());
                    } else {
                        var obj = this.findObject(list, value[i]);
                        rc.push(obj ? obj.toString() : value[i]);
                    }
                }
                return rc.join(",");
            } else {
                var obj = this.findObject(list, value);
                if (obj) {
                    return obj.toString()
                }
            }
        }
        return value;
    },

    toString: function(obj, columns)
    {
        if (obj == null) return null;
        if (typeof obj == "object") {
            var item = "";
            // Show class name as the first column for mutli object lists
            if (columns && columns.indexOf("__class__") >= 0) {
                item = className(obj)
            }
            if (!columns && obj.hasOwnProperty('toString')) {
                item = obj.toString()
            } else {
                for (p in obj) {
                    if (typeof obj[p] == "function") {
                        if (p != "toString") continue;
                        item += (item != "" ? this.separator : "") + obj.toString();
                    } else
                    if (!columns || columns.indexOf(p) >= 0) {
                        item += (item != "" ? this.separator : "") + this.modelValue(p, obj[p]);
                    }
                }
            }
            return item
        }
        return obj;
    },

    processTags: function(obj, name)
    {
        if (!obj || !obj.tags) return;
        for (var i in obj.tags) {
            switch (obj.tags[i].key) {
            case "Name":
                obj[name || "name"] = obj.tags[i].value;
                return;
            }
        }
    },

    findObject: function(list, id)
    {
        for (var i in list) {
            if (list[i].id && list[i].id == id) return list[i];
            if (list[i].name && list[i].name == id) return list[i];
        }
        return null;
    },

    // Return objects if all arguments match
    getObjects: function(items, args)
    {
        if (!args.length) return items || [];
        var list = [];
        if (items) {
            for (var i in items) {
                var matches = 0;
                for (var j = 0; j < args.length - 1; j += 2) {
                    if (items[i][args[j]] == args[j + 1]) matches++;
                }
                if (matches == args.length/2) {
                    list.push(items[i])
                }
            }
        }
        return list;
    },

    notifyComponents : function(interest)
    {
        var comps = this.componentInterests[interest] || [];
        for (var i in comps) {
            if (ew_menu.isViewVisible(comps[i])) {
                comps[i].notifyModelChanged(interest);
            } else {
                comps[i].display([]);
            }
        }
    },

    registerInterest : function(component, interest)
    {
        var list = (interest instanceof Array) ? interest : [interest];
        for (var i in list) {
            if (!this.componentInterests[list[i]]) {
                this.componentInterests[list[i]] = [];
            }
            this.componentInterests[list[i]].push(component);
        }
    },

    updateVMFADevices : function(list)
    {
        this.vmfa = list;
        this.notifyComponents("vmfa");
    },

    getVMFADevicess : function()
    {
        if (this.vmfa == null) {
            ew_session.controller.listVirtualMFADevices();
        }
        return this.getObjects(this.vmfa, arguments);
    },

    updateRegions : function(list)
    {
        this.regions = list;
        this.notifyComponents("regions");
    },

    getRegions : function()
    {
        if (this.regions == null) {
            ew_session.controller.describeRegions();
        }
        return this.getObjects(this.regions, arguments);
    },

    updateUsers : function(list)
    {
        this.users = list;
        this.notifyComponents("users");
    },

    getUsers : function()
    {
        if (this.users == null) {
            ew_session.controller.listUsers();
        }
        return this.getObjects(this.users, arguments);
    },

    getUserByName: function(name)
    {
        return this.findObject(this.users, name, 'name');
    },

    updateGroups : function(list)
    {
        this.groups = list;
        this.notifyComponents("groups");
    },

    getGroups : function()
    {
        if (this.groups == null) {
            ew_session.controller.listGroups();
        }
        return this.getObjects(this.groups, arguments);
    },

    getGroupByName: function(name)
    {
        return this.findObject(this.groups, name, 'name');
    },

    updateS3Buckets : function(list)
    {
        this.s3Buckets = list;
        this.notifyComponents("s3Buckets");
    },

    getS3Buckets : function()
    {
        if (this.s3Buckets == null) {
            ew_session.controller.listS3Buckets();
        }
        return this.getObjects(this.s3Buckets, arguments);
    },

    getS3Bucket: function(bucket) {
        for (var i in this.s3Buckets) {
            if (bucket == this.s3Buckets[i].name) {
                return this.s3Buckets[i]
            }
        }
        return null;
    },

    getS3BucketKey: function(bucket, key) {
        for (var i in this.s3Buckets) {
            if (bucket == this.s3Buckets[i].name) {
                for (var j in this.s3Buckets[i].keys) {
                    if (this.s3Buckets[i].keys[j].name == key) {
                        return this.s3Buckets[i].keys[j]
                    }
                }
                break;
            }
        }
        return null;
    },

    updateNetworkInterfaces: function(list)
    {
        this.networkInterfaces = list;
        this.notifyComponents("networkInterfaces");
    },

    getNetworkInterfaces: function()
    {
        if (this.networkInterfaces == null) {
            ew_session.controller.describeNetworkInterfaces();
        }
        return this.getObjects(this.networkInterfaces, arguments);
    },

    updateVpcs : function(list)
    {
        this.vpcs = list;
        this.notifyComponents("vpcs");
    },

    getVpcs : function()
    {
        if (this.vpcs == null) {
            ew_session.controller.describeVpcs();
        }
        return this.getObjects(this.vpns, arguments);
    },

    getVpcById: function(id)
    {
        return this.findObject(this.vpcs, id)
    },

    updateSubnets : function(list)
    {
        this.subnets = list;
        this.notifyComponents("subnets");
    },

    getSubnets : function()
    {
        if (this.subnets == null) {
            ew_session.controller.describeSubnets();
        }
        return this.getObjects(this.subnets, arguments);
    },

    getSubnetById: function(id)
    {
        return this.findObject(this.subnets, id)
    },

    getSubnetsByVpcId: function(vpcId)
    {
        var rc = []
        for (var i in this.subnets) {
            if (this.subnets[i].vpcId == vpcId) {
                rc.push(this.subnets[i])
            }
        }
        return rc
    },

    updateDhcpOptions : function(list)
    {
        this.dhcpOptions = list;
        this.notifyComponents("dhcpOptions");
    },

    getDhcpOptions : function()
    {
        if (this.dhcpOptions == null) {
            ew_session.controller.describeDhcpOptions();
        }
        return this.dhcpOptions;
    },

    updateVpnConnections : function(list)
    {
        this.vpnConnections = list;
        this.notifyComponents("vpnConnections");
    },

    getVpnConnections : function()
    {
        if (this.vpnConnections == null) {
            ew_session.controller.describeVpnConnections();
        }
        return this.getObjects(this.vpnConnections, arguments);
    },

    updateVpnGateways : function(list)
    {
        this.vpnGateways = list;
        this.notifyComponents("vpnGateways");
    },

    getVpnGateways : function()
    {
        if (this.vpnGateways == null) {
            ew_session.controller.describeVpnGateways();
        }
        return this.getObjects(this.vpnGateways, arguments);
    },

    updateCustomerGateways : function(list)
    {
        this.customerGateways = list;
        this.notifyComponents("customerGateways");
    },

    getCustomerGateways : function()
    {
        if (this.customerGateways == null) {
            ew_session.controller.describeCustomerGateways();
        }
        return this.getObjects(this.customerGateways, arguments);
    },

    updateInternetGateways : function(list)
    {
        this.internetGateways = list;
        this.notifyComponents("internetGateways");
    },

    getInternetGateways : function()
    {
        if (this.internetGateways == null) {
            ew_session.controller.describeInternetGateways();
        }
        return this.getObjects(this.internetGateways, arguments);
    },

    updateRouteTables : function(list)
    {
        this.routeTables = list;
        this.notifyComponents("routeTables");
    },

    getRouteTables : function()
    {
        if (this.routeTables == null) {
            ew_session.controller.describeRouteTables();
        }
        return this.getObjects(this.routeTables, arguments);
    },

    updateNetworkAcls : function(list)
    {
        this.networkAcls = list;
        this.notifyComponents("networkAcls");
    },

    getNetworkAcls : function()
    {
        if (this.networkAcls == null) {
            ew_session.controller.describeNetworkAcls();
        }
        return this.getObjects(this.networkAcls, arguments);
    },

    getNetworkAclsByVpcId: function(vpcId)
    {
        var rc = []
        for (var i in this.networkAcls) {
            if (this.networkAcls[i].vpcId == vpcId) {
                rc.push(this.networkAcls[i])
            }
        }
        return rc
    },

    getNetworkAclAssociation: function(subnetId)
    {
        for (var i in this.networkAcls) {
            for (var j in acls[i].associations) {
                if (acls[i].associations[j].subnetId == subnetId) {
                    return acls[i].associations[j].id
                }
            }
        }
        return null;
    },

    getVolumes : function()
    {
        if (this.volumes == null) {
            ew_session.controller.describeVolumes();
        }
        return this.getObjects(this.volumes, arguments);
    },

    updateVolumes : function(list)
    {
        this.volumes = list;
        this.notifyComponents("volumes");
    },

    updateSnapshots : function(list)
    {
        if (!this.images) {
            ew_session.controller.describeImages();
        }

        this.snapshots = list;

        if (this.images && list) {
            var amiNames = new Object();

            for ( var i = 0; i < this.images.length; i++) {
                var image = this.images[i];
                amiNames[image.id] = image.name;
            }

            for ( var i = 0; i < list.length; i++) {
                var snapshot = list[i];
                var snapshotAmiId = null;
                var m = null;

                if (snapshot.description && (m = snapshot.description.match(/\bami-\w+\b/))) {
                    snapshotAmiId = m[0];
                }

                if (snapshotAmiId) {
                    snapshot.amiId = snapshotAmiId;
                    snapshot.amiName = amiNames[snapshotAmiId];
                }
            }
        }

        this.notifyComponents("snapshots");
    },

    getSnapshots : function()
    {
        if (this.snapshots == null) {
            ew_session.controller.describeSnapshots();
        }
        return this.getObjects(this.snapshots, arguments);
    },

    updateImages : function(list)
    {
        this.images = list;
        this.notifyComponents("images");
    },

    getImages : function()
    {
        if (this.images == null) {
            ew_session.controller.describeImages();
        }
        return this.getObjects(this.images, arguments);
    },

    getInstances: function() {
        if (this.instances == null) {
            ew_session.controller.describeInstances();
        }
        return this.getObjects(this.instances, arguments);
    },

    updateInstances : function(list)
    {
        this.instances = list;
        this.notifyComponents("instances");
    },

    getInstanceById: function(id) {
        return this.findObject(this.instances, id)
    },

    updateKeypairs : function(list)
    {
        this.keypairs = list;
        this.notifyComponents("keypairs");
    },

    getKeypairs : function()
    {
        if (this.keypairs == null) {
            ew_session.controller.describeKeypairs();
        }
        return this.keypairs;
    },

    updateSecurityGroups : function(list)
    {
        this.securityGroups = list;
        this.notifyComponents("securityGroups");
    },

    getSecurityGroups : function()
    {
        if (this.securityGroups == null) {
            ew_session.controller.describeSecurityGroups();
        }
        return this.getObjects(this.securityGroups, arguments);
    },

    getSecurityGroupById: function(id)
    {
        return this.findObject(this.securityGroups, id)
    },

    getSecurityGroupsByVpcId: function(vpcId)
    {
        var list = [];
        if (this.securityGroups) {
            for (var i in this.securityGroups) {
                if (this.securityGroups[i].vpcId == vpcId) {
                    list.push(this.securityGroups[i]);
                }
            }
        }
        return list;
    },

    getAddresses : function()
    {
        if (this.addresses == null) {
            ew_session.controller.describeAddresses();
        }
        return this.getObjects(this.addresses, arguments);
    },

    updateAddresses : function(list)
    {
        this.addresses = list;
        this.notifyComponents("addresses");
    },

    getAddressByIp: function(ip)
    {
        if (this.addresses) {
            for (var i in this.addresses) {
                if (this.addresses[i].publicIp == ip) return this.addresses[i];
            }
        }
        return null;
    },

    getAddressByInstanceId: function(id)
    {
        if (this.addresses) {
            for (var i in this.addresses) {
                if (this.addresses[i].instanceId == id) return this.addresses[i];
            }
        }
        return null;
    },

    updateAvailabilityZones : function(list)
    {
        this.availabilityZones = list;
        this.notifyComponents("availabilityZones");
    },

    getAvailabilityZones : function()
    {
        if (this.availabilityZones == null) {
            ew_session.controller.describeAvailabilityZones();
        }
        return this.availabilityZones;
    },

    updateBundleTasks : function(list)
    {
        this.bundleTasks = list;
        this.notifyComponents("bundleTasks");
    },

    getBundleTasks : function()
    {
        if (this.bundleTasks == null) {
            ew_session.controller.describeBundleTasks();
        }
        return this.bundleTasks;
    },

    updateLeaseOfferings : function(list)
    {
        this.offerings = list;
        this.notifyComponents("offerings");
    },

    getLeaseOfferings : function()
    {
        if (this.offerings == null) {
            ew_session.controller.describeLeaseOfferings();
        }
        return this.offerings;
    },

    updateReservedInstances : function(list)
    {
        this.reservedInstances = list;
        this.notifyComponents("reservedInstances");
    },

    getReservedInstances : function()
    {
        if (this.reservedInstances == null) {
            ew_session.controller.describeReservedInstances();
        }
        return this.reservedInstances;
    },

    updateLoadBalancers : function(list)
    {
        this.loadBalancers = list;
        this.notifyComponents("loadBalancers");
    },

    getLoadBalancers : function()
    {
        if (this.loadBalancers == null) {
            ew_session.controller.describeLoadBalancers();
            return null;
        }
        return this.getObjects(this.loadBalancers, arguments);
    },

    getS3Regions: function()
    {
        return [ { name: "US Standard", url: "s3.amazonaws.com", region: "" },
                 { name: "US West (Oregon)", url: "s3-us-west-2.amazonaws.com", region: "us-west-2" },
                 { name: "US West (Northern California)", url: "s3-us-west-1.amazonaws.com", region: "us-west-1" },
                 { name: "EU (Ireland)", url: "s3-eu-west-1.amazonaws.com", region: "EU" },
                 { name: "Asia Pacific (Singapore)", url: "s3-ap-southeast-1.amazonaws.com", region: "ap-southeast-1" },
                 { name: "Asia Pacific (Tokyo)", url: "s3-ap-northeast-1.amazonaws.com", region: "ap-northeast-1" },
                 { name: "South America (Sao Paulo)", url: "s3-sa-east-1.amazonaws.com", region: "sa-east-1" },
                 { name: "GovCloud", url: "s3-us-gov-west-1.amazonaws.com", region: 'us-gov-west-1' } ]
    },

    getS3Region: function(region)
    {
        var regions = this.getS3Regions();
        for (var i in regions) {
            if (regions[i].region == region) {
                return regions[i]
            }
        }
        return regions[0]
    },

    getEC2Regions: function()
    {
        return [ { name: 'us-east-1', url: 'https://ec2.us-east-1.amazonaws.com' },
                 { name: 'eu-west-1', url: 'https://ec2.eu-west-1.amazonaws.com' },
                 { name: 'us-west-1', url: 'https://ec2.us-west-1.amazonaws.com' },
                 { name: 'ap-southeast-1', url: 'https://ec2.ap-southeast-1.amazonaws.com' },
                 { name: 'ap-northeast-1', url: 'https://ec2.ap-northeast-1.amazonaws.com' },
                 { name: 'us-gov-west-1', url: 'https://ec2.us-gov-west-1.amazonaws.com' },
            ];
    },

}
