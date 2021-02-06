from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

CARDPACK_CHOICES = ( 
    ("Dig Deeper", "Ice Break"),
    ("Love Birds", "Mix & Match"), 
) 
# Create your models here.
class DigDeeper(models.Model):
    index = models.IntegerField('Index', null=True, blank=False)
    level = models.IntegerField('Level', default=1,
        validators=[
                MaxValueValidator(5),
                MinValueValidator(1)
            ]
        )
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=100, null=True, blank=False)

    class Meta:
        db_table = 'DigDeeper'

    def __str__(self):
        return self.question

class IceBreak(models.Model):
    index = models.IntegerField('Index', null=True, blank=False)
    level = models.IntegerField('Level', default=1,
        validators=[
                MaxValueValidator(5),
                MinValueValidator(1)
            ]
        )
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=100, null=True, blank=False)

    class Meta:
        db_table = 'IceBreak'

    def __str__(self):
        return self.question

# class Player(models.Model):
#     numberOfPlayer = models.IntegerField('Number of Players', default=2)
#     if numberOfPlayer == 2 :
#         firstPlayer = models.TextField('Player 1', max_length=100, null=True, blank=False)
#         secondPlayer = models.TextField('Player 2', max_length=100, null=True, blank=False)
#     pack = models.CharField('Card Pack', 
#         max_length=120, null=True, blank=False,
#         choices = CARDPACK_CHOICES, 
#         )
#     if pack == "Dig Deeper" :
#         level = models.IntegerField('Number of Players', default=1,
#         validators=[
#                 MaxValueValidator(3),
#                 MinValueValidator(1)
#             ]
#         )
     
#     class Meta:
#         db_table = 'player'

#     def __str__(self):
#         return self.question
