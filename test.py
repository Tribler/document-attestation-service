import fractions
import decimal
d = decimal.Decimal
decimal.getcontext().prec = 100

f = fractions.Fraction

rate = 1
for i in range(120):
    rate *= (f(10000)-f(i))/f(10000)


print(1-rate)
