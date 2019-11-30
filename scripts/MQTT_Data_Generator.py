import paho.mqtt.client as mqtt #import the client
import time

broker_address="localhost"
client = mqtt.Client()
client.connect(broker_address)
i = 0.0
going_down = False

while(True):

	client.publish("hybrid/engine/AFR", "1:" + str(10.0 + i/4.0))
	client.publish("hybrid/engine/TPS", "2:" + str(0 + i * 10.0))
	client.publish("hybrid/engine/spkadv", "3:" + str(i + 2.0))
	client.publish("hybrid/engine/pw", "4:" + str(10.0 + i/4.0))
	client.publish("hybrid/engine/temperature", "33:" + str(170.0 + i * 2.0))
	client.publish("hybrid/dash/charge", "45:" + str(i * 10.0))
	client.publish("hybrid/dash/fuel", "67:" + str(100.0 - i * 10.0))
	client.publish("hybrid/driverinputs/throttle", "68:" + str(i * 10.0))
	client.publish("hybrid/driverinputs/brake", "69:" + str(100.0 - i * 10.0))
	client.publish("hybrid/dash/speed", "70:" + str(i * 10.0))
	client.publish("hybrid/dash/rpm", "71:" + str(i * 1000.0))
	client.publish("hybrid/dash/GLVoltage", "88:" + str(10.0 + i * 0.4))

	client.publish("hybrid/chassis/FL_brake", "89:" + str(100 + i*10.0))
	client.publish("hybrid/chassis/FR_brake", "90:" + str(100 + i*10.0))
	client.publish("hybrid/chassis/RL_brake", "91:" + str(100 + i*10.0))
	client.publish("hybrid/chassis/RR_brake", "92:" + str(100 + i*10.0))

	# print("data set sent for iteration value: " + str(i) + " sent temp was " + str(170.0 + i * 2.0))

	if(going_down == False):
		i += 0.01
	else:
		i -= 0.01

	if(i >= 10):
		going_down = True
	if(i <= 0):
		going_down = False

	# time chosen to emulate 1000 data points per second with 6 data points every 0.006 seconds (max data being sent)
	time.sleep(0.006)
